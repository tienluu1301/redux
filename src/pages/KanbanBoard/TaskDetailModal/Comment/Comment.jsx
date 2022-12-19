import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'


import { TextFieldV2 as TextField } from '../../../../components/TextField';
import Button from '../../../../components/Button';
import CommentItem from '../CommentItem';


import { Avatar } from '@mui/material';


import commentAPI from '../../../../services/commentAPI'
import { getTaskById } from '../../../../redux/slices/taskSlice'

import classNames from 'classnames/bind'
import styles from './Comment.module.scss'
import useRequest from '../../../../hooks/useRequest';
const cx = classNames.bind(styles)


const Comment = () => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { task } = useSelector(state => state.task)
    const commentRef = useRef()

    const [isCommentInputVisible, SetIsCommentInputVisible] = useState(false)


    const createComment = useRequest(commentAPI.createComment, { manual: true })

    const handleOpenCommentInput = () => {
        SetIsCommentInputVisible(true)
    }

    const handleCloseCommentInput = () => {
        SetIsCommentInputVisible(false)
    }

    const handleAddComment = () => {
        createComment.runAsync({
            taskId: task.taskId,
            contentComment: commentRef.current.getValue()
        })
            .then(() => {
                toast.success("Add comment successful")
                commentRef.current.setValue('')
                dispatch(getTaskById(task.taskId))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleUpdateComment = (item, inputRef, formMethod) => {
        formMethod.setLoadingSaveBtn(true)
        commentAPI.updateComment({
            id: item.id,
            contentComment: inputRef.current.getValue()
        })
            .then(() => {
                toast.success("Update comment successful")
                formMethod.handleCloseEdit()
                dispatch(getTaskById(task.taskId))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
            .finally(() => {
                formMethod.setLoadingSaveBtn(false)

            })
    }

    const handleDeleteComment = (item) => {
        commentAPI.deleteComment(item.id)
            .then(() => {
                toast.success("Delete comment successful")
                dispatch(getTaskById(task.taskId))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    return (
        <div className={cx('container')}>
            <div className={cx('inputWrapper')}>
                <Avatar src={user?.avatar} sx={{ width: 32, height: 32 }} />
                <div className={cx('inputGroup', { visible: isCommentInputVisible })}>
                    <TextField
                        className={cx('inputRoot')}
                        inputClass={cx('input')}
                        type='textarea'
                        rows='1'
                        variant='trello'
                        placeholder='Add a comment...'
                        onClick={handleOpenCommentInput}
                        autoHeight
                        ref={commentRef}
                    />
                    <p className={cx('inputHelper')}>
                        <span>Pro tip: </span>
                        press 👻 to comment
                    </p>
                    <div className={cx('inputControl')}>
                        <Button
                            solid primary
                            onClick={handleAddComment}
                            disable={createComment.loading}
                        >
                            Save
                        </Button>
                        <Button solid onClick={handleCloseCommentInput}>Cancel</Button>
                    </div>
                </div>
            </div>
            <div className={cx('listComment')}>
                {task?.lstComment.slice()
                    .reverse().map(item => (
                        <CommentItem
                            key={item.id}
                            item={item}
                            onSubmit={handleUpdateComment}
                            onDelete={handleDeleteComment}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Comment