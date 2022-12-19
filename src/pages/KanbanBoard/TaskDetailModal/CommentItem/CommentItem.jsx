import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TextFieldV2 as TextField } from '../../../../components/TextField';
import Button from '../../../../components/Button';


import { Avatar } from '@mui/material';

import classnames from 'classnames/bind'
import styles from './CommentItem.module.scss'
const cx = classnames.bind(styles)

const CommentItem = ({
    item,
    onSubmit = () => { },
    onDelete = () => { },
    inputHelperText
}) => {

    const ref = useRef()
    const { user } = useSelector(state => state.auth)
    const [IsEditing, setIsEditing] = useState(false)
    const [loadingSaveBtn, setLoadingSaveBtn] = useState(false)

    const isOwner = item.idUser === user.id

    const handleOpenEdit = () => {
        setIsEditing(true)
        // Do hạn chế mount nhiều textarea vào DOM nên mỗi lần setIsEditing , thì
        // textarea mới mount vào DOM=> dùng setTimeOut để lấy node sau khi được mount
        setTimeout(() => {
            ref.current.getInputNode().focus?.()
        }, 0)
    }

    const handleCloseEdit = () => {
        setIsEditing(false)
    }

    const method = {
        handleOpenEdit,
        handleCloseEdit,
        setLoadingSaveBtn
    }

    const handleSubmit = () => {
        onSubmit(item, ref, method)
    }

    const handleDelete = () => {
        onDelete(item, ref, method)
    }

    if (!item) return null
    return (
        <div className={cx('item', { owner: isOwner, editing: IsEditing })}>
            <Avatar src={item.avatar} sx={{ width: 32, height: 32 }} />
            <div className={cx('inputWrapper')}>
                <p className={cx('commentOwner')}>{item.name}</p>
                <p className={cx('commentContent')}>{item.commentContent}</p>
                {isOwner ? (
                    <>
                        {IsEditing ?
                            <TextField
                                className={cx('inputRoot')}
                                value={item.commentContent || ''}
                                inputClass={cx('input')}
                                type='textarea'
                                rows='3'
                                variant='trello'
                                placeholder='Add a comment...'
                                // autoHeight
                                ref={ref}
                            /> : null
                        }
                        {inputHelperText}
                        <div className={cx('editControl')}>
                            <button onClick={handleOpenEdit}>Edit</button>
                            <span>▪</span>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                        <div className={cx('inputControl')}>
                            <Button
                                solid
                                primary
                                onClick={handleSubmit}
                                disable={loadingSaveBtn}
                            >
                                Save
                            </Button>
                            <Button solid onClick={handleCloseEdit}>Cancel</Button>
                        </div>
                    </>) : null}
            </div>
        </div>
    )
}

export default CommentItem