import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ClearIcon from '@mui/icons-material/Clear';


// import useRequest from '../../../hooks/useRequest'
import projectAPI from '../../../services/projectAPI'
import anothersAPI from '../../../services/anothersAPI'
import { toggleTaskModal, getTaskById } from '../../../redux/slices/taskSlice'

import { getProjectDetail } from '../../../redux/slices/projectSlice'

import { taskTypeMap, priorityMap } from '../dummyData'

import Button from '../../../components/Button';
import MenuSelect from '../../../components/MenuSelect';
import MyCkEditor from '../../../components/MyCkEditor';
import { TextFieldV2 as TextField } from '../../../components/TextField';

import { Avatar } from '@mui/material';

import classnames from 'classnames/bind'
import styles from './TaskDetailModal.module.scss'
const cx = classnames.bind(styles)



const FakeEditor = ({ value, ...passProps }) => {
    const ref = useRef()
    useEffect(() => {
        ref.current.innerHTML = value
    }, [value])
    return <div ref={ref} {...passProps}></div>
}


const TaskDetailModal = () => {
    const dispatch = useDispatch()

    const descriptionRef = useRef()
    const [isEditorVisible, SetIsEditorVisible] = useState(false)
    // const [isCommentInputVisible, SetIsEditorVisible] = useState(false)

    const { task, isTaskModalOpen } = useSelector(state => state.task)
    const { selectedProject } = useSelector(state => state.project)
    const { user } = useSelector(state => state.auth)

    const handleOpenEditor = () => {
        SetIsEditorVisible(true)
    }

    const handleCloseEditor = () => {
        SetIsEditorVisible(false)
        descriptionRef.current.setData(task.description)
    }

    const handleUpdateTaskName = (value, inputMethod) => {
        const data = { ...task, taskName: value }
        projectAPI.updateTask(data)
            .then(() => {
                toast.success("Update task successful")
                dispatch(getProjectDetail(selectedProject.id))
            })
            .catch((error) => {
                inputMethod.setValue(task.taskName)
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleUpdateDescription = () => {
        projectAPI.updateTaskDescription({
            taskId: task.taskId,
            description: descriptionRef.current.getData()
        })
            .then(() => {
                toast.success("Update task successful")
                dispatch(getProjectDetail(selectedProject.id))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
                descriptionRef.current.setData(task.description)
            })
    }

    const handleChangeStatus = (item, selectMethod) => {
        selectMethod.toggleSelect()
        projectAPI.updateTaskStatus({
            taskId: task.taskId,
            statusId: item.statusId
        })
            .then(() => {
                toast.success("Change status successful")
                dispatch(getProjectDetail(selectedProject.id))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
                selectMethod.setValue(task?.taskStatusDetail)
            })

    }

    const handleChangePriority = (item, selectMethod) => {
        selectMethod.toggleSelect()
        projectAPI.updateTaskPriority({
            taskId: task.taskId,
            priorityId: item.priorityId
        })
            .then(() => {
                toast.success("Change priority successful")
                dispatch(getProjectDetail(selectedProject.id))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
                selectMethod.setValue(task?.priorityTask)
            })
    }

    const handleRemoveUser = (id) => {
        projectAPI.removeUserFromTask({
            taskId: task.taskId,
            userId: id
        })
            .then(() => {
                toast.success("Remove user successful")
                dispatch(getProjectDetail(selectedProject.id))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleAddUser = (item, selectMethod) => {
        console.log({
            taskId: task.taskId,
            userId: item.userId
        }, item)
        projectAPI.addUserToTask({
            taskId: task.taskId,
            userId: item.userId
        })
            .then(() => {
                toast.success("Add user successful")
                dispatch(getProjectDetail(selectedProject.id))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
                selectMethod.toggleSelect(false)
            })
    }

    const handleDeleteTask = () => {
        projectAPI.deleteTask(task.taskId)
            .then(() => {
                toast.success("Delte task successful")
                dispatch(toggleTaskModal(false))
                dispatch(getProjectDetail(selectedProject.id))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleChangeEstimate = (value) => {
        projectAPI.updateTaskEstimate({
            taskId: task.taskId,
            originalEstimate: value
        })
            .then(() => {
                toast.success("Delte task successful")
                dispatch(getProjectDetail(selectedProject.id))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleCloseTaskModal = () => {
        dispatch(toggleTaskModal(false))
    }



    return (
        <Dialog
            open={isTaskModalOpen}
            scroll="body"
            maxWidth='md'
            fullWidth={true}
            onClose={handleCloseTaskModal}
        >
            <DialogTitle>
                <header className={cx('header')}>
                    <div className={cx('headerLeft')}>
                        <MenuSelect
                            serviceAPI={anothersAPI.getTaskType}
                            value={task?.taskTypeDetail}
                            renderItem={(item) => (
                                <div className={cx('taskType')}>
                                    {taskTypeMap[item.id]?.icon}
                                    <span>
                                        {taskTypeMap[item.id]?.name} - {task?.taskId}
                                    </span>
                                </div>
                            )}
                            placement='bottom-start'
                            getSearchKey={(item) => item.taskType}
                            getItemsKey={(item) => item.id}
                            selectPlaceHolder={"Select Task Type"}
                        />
                    </div>
                    <div className={cx('headerRight')}>
                        <Button className={cx('headerBtn')}>
                            <CampaignOutlinedIcon fontSize='inherit' color='inherit' />
                            <span>
                                Give feedback
                            </span>
                        </Button>
                        <Button
                            className={cx('headerBtn')}
                            onClick={handleDeleteTask}
                        >
                            <DeleteOutlineIcon fontSize='inherit' color='inherit' />
                        </Button>
                        <Button
                            className={cx('headerBtn')}
                            onClick={handleCloseTaskModal}
                        >
                            <ClearIcon fontSize='inherit' color='inherit' />
                        </Button>
                    </div>
                </header>
            </DialogTitle>
            <DialogContent>
                <section className={cx('body')}>
                    <div className={cx('left')}>
                        <div className={cx('titleWrapper')}>
                            <TextField
                                onBlur={handleUpdateTaskName}
                                inputClass={cx('taskName')}
                                type='textarea'
                                rows='1'
                                value={task?.taskName}
                                variant='trello'
                                autoHeight
                            />
                        </div>
                        <div className={cx('formGroup')}>
                            <h4>Description</h4>
                            <div className={cx('editor', { visible: isEditorVisible })}>
                                <MyCkEditor
                                    data={task?.description}
                                    editorRef={descriptionRef}
                                />
                            </div>
                            <FakeEditor
                                className={cx('editor', { visible: !isEditorVisible })}
                                value={task?.description}
                                onClick={handleOpenEditor}
                            />
                            <div className={cx('descriptionControl', { visible: isEditorVisible })}>
                                <Button solid primary onClick={handleUpdateDescription}>Save</Button>
                                <Button solid onClick={handleCloseEditor}>Cancel</Button>
                            </div>
                        </div>
                        <div className={cx('formGroup')}>
                            <h4>Comments</h4>
                            <div className={cx('commentContainer')}>
                                <div className={cx('commentInput')}>
                                    <Avatar src={user?.avatar} />
                                    <TextField type='textarea' variant='trello' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('formGroup')}>
                            <h4>STATUS</h4>
                            <MenuSelect
                                serviceAPI={anothersAPI.getTaskStatus}
                                value={task?.taskStatusDetail}
                                renderItem={(item) => (
                                    <div className={cx('taskStatus')}>
                                        {item.statusName}
                                    </div>
                                )}
                                getSearchKey={(item) => item.statusName}
                                getItemsKey={(item) => item.statusId}
                                onChange={handleChangeStatus}
                                selectPlaceHolder={"Select Status"}
                                arrow
                            />
                        </div>
                        <div className={cx('formGroup')}>
                            <h4>ASSIGNMENT</h4>
                            <div className={cx('memberWrapper')}>
                                {task?.assigness.map(item => (
                                    <div className={cx('member')} key={item.id}>
                                        <Avatar src={item.avatar} sx={{ width: 24, height: 24 }} />
                                        <span>{item.name}</span>
                                        <button
                                            className={cx('removeMemberBtn')}
                                            onClick={() => handleRemoveUser(item.id)}
                                        >
                                            <ClearIcon fontSize='inherit' color='inherit' />
                                        </button>
                                    </div>
                                ))}
                                <MenuSelect
                                    onChange={handleAddUser}
                                    renderItem={(item) => (
                                        <div className={cx('assignment')}>
                                            <Avatar src={item.avatar} sx={{ width: 24, height: 24 }} />
                                            <span>
                                                {item.name}
                                            </span>
                                        </div>
                                    )}
                                    getSearchKey={(item) => item.name}
                                    getItemsKey={(item) => item.userId}
                                    items={selectedProject?.members || []}
                                    rootClass={cx('assignmentBtnWrapper')}
                                    defaultPlaceHolder={(
                                        <div className={cx('assignmentBtn')}>
                                            <AddOutlinedIcon fontSize='inherit' color='inherit' />
                                            <span>Add User</span>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <div className={cx('formGroup')}>
                            <h4>PRIORITY</h4>
                            <MenuSelect
                                serviceAPI={anothersAPI.getPriorities}
                                value={task?.priorityTask}
                                renderItem={(item) => (
                                    <div className={cx('taskPriority')}>
                                        {priorityMap[item.priorityId]?.icon}
                                        <span>{item.priority}</span>
                                    </div>
                                )}
                                getSearchKey={(item) => item.description}
                                getItemsKey={(item) => item.priorityId}
                                selectPlaceHolder={"Select Status"}
                                onChange={handleChangePriority}
                            />
                        </div>
                        <div className={cx('formGroup')}>
                            <h4>ORIGINAL ESTIMATE (HOURS)</h4>
                            <TextField
                                variant='trello'
                                value={task?.originalEstimate}
                                onBlur={handleChangeEstimate}
                            />
                        </div>
                        <div className={cx('formGroup')}>
                            <h4>TIME TRACKING</h4>
                            <MenuSelect
                                renderItem={() => 'dsad'}
                                items={[]}
                                title={"unassign"}
                            />
                        </div>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    )
}

export default TaskDetailModal