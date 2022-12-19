import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

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
import TimeTracking from '../../component/TimeTracking';
import SkeletonLoad from './SkeletonLoad';
import Comment from './Comment';

import { Avatar } from '@mui/material';

import classnames from 'classnames/bind'
import styles from './TaskDetailModal.module.scss'
const cx = classnames.bind(styles)


const TaskDetailModal = () => {
    const dispatch = useDispatch()

    const descriptionRef = useRef()
    const timeTrackingRef = useRef()
    const timeSpendRef = useRef()
    const timeRemainRef = useRef()

    const [isEditorVisible, SetIsEditorVisible] = useState(false)

    const { task, isTaskModalOpen, loading } = useSelector(state => state.task)
    const { selectedProject } = useSelector(state => state.project)
    // const loading = true

    const handleOpenEditor = () => {
        SetIsEditorVisible(true)
    }
    const handleCloseEditor = () => {
        SetIsEditorVisible(false)
        descriptionRef.current.setData(task.description)
    }

    // Không có API updateTaskName nên dùng API updateTask(update toàn bộ thông tin)
    // Vì vậy cần gán lại các field cần thiết để hợp lệ
    // Đồng thời mỗi lần update các thông tin khác ngoài taskName thì cần dispatch getTaskDetail để lấy
    // thông tin mới nhất tránh trường hợp khi update taskName, các field có các giá trị cũ làm reset lại tất cả
    // các lần update các thông tin khác trước đó (gây ra render lại nhiều lần do mỗi lần cần update phải lấy thông tin mới nhất của task)
    const handleUpdateTaskName = (value, inputMethod) => {
        if (value === task?.taskName) return
        const data = {
            ...task,
            taskName: value,
            listUserAsign: task.assigness.map(item => item.id)
        }
        projectAPI.updateTask(data)
            .then(() => {
                toast.success("Update task successful")
                dispatch(getTaskById(task.taskId))
            })
            .catch((error) => {
                inputMethod.setValue(task.taskName)
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleUpdateTaskType = (value, inputMethod) => {
        const data = {
            ...task,
            typeId: value.id,
            listUserAsign: task.assigness.map(item => item.id)
        }
        projectAPI.updateTask(data)
            .then(() => {
                toast.success("Update task successful")
                dispatch(getTaskById(task.taskId))
            })
            .catch((error) => {
                inputMethod.setValue(task.taskTypeDetail)
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleUpdateDescription = () => {
        projectAPI.updateTaskDescription({
            taskId: task.taskId,
            description: descriptionRef.current.getData(),
        })
            .then(() => {
                toast.success("Update task successful")
                dispatch(getTaskById(task.taskId))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
                descriptionRef.current.setData(task.description)
            })
    }

    const handleChangeStatus = (item, selectMethod) => {
        projectAPI.updateTaskStatus({
            taskId: task.taskId,
            statusId: item.statusId
        })
            .then(() => {
                toast.success("Change status successful")
                dispatch(getTaskById(task.taskId))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
                selectMethod.setValue(task?.taskStatusDetail)
            })

    }

    const handleChangePriority = (item, selectMethod) => {
        projectAPI.updateTaskPriority({
            taskId: task.taskId,
            priorityId: item.priorityId
        })
            .then(() => {
                toast.success("Change priority successful")
                dispatch(getTaskById(task.taskId))
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
                dispatch(getTaskById(task.taskId))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleAddUser = (item, selectMethod) => {
        // projectAPI.addUserToTask({   // API bị lỗi không tìm thấy tài nguyên 
        //     taskId: task.taskId,
        //     userId: item.userId,
        // projectId: selectedProject.id // Thêm field projectId thì thành công, nhưng data trả về ko có user
        // })
        // Dùng API updateTask thay thế
        projectAPI.updateTask({
            ...task,
            listUserAsign: [...task.assigness.map(item => item.id), item.userId],
            taskId: task.taskId,
        })
            .then(() => {
                toast.success("Add user successful")
                dispatch(getTaskById(task.taskId))
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
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleChangeEstimate = (value, inputMethod) => {
        if (value === Number(task?.originalEstimate)) return

        projectAPI.updateTaskEstimate({
            taskId: task.taskId,
            originalEstimate: value,
        })
            .then(() => {
                toast.success("Update task successful")
                dispatch(getTaskById(task.taskId))
            })
            .catch((error) => {
                inputMethod.setValue(task?.originalEstimate)
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleChangeTime = (_) => {
        // console.log({
        //     taskId: task.taskId,
        //     timeTrackingSpent: timeSpendRef.current.getValue(),
        //     timeTrackingRemaining: timeRemainRef.current.getValue()
        // })
        let timeSpend = timeSpendRef.current.getValue()
        let timeRemain = timeRemainRef.current.getValue()
        if (timeSpend === Number(task?.timeTrackingSpent)
            && timeRemain === Number(task?.timeTrackingRemaining)) return

        projectAPI.updateTaskTimeTracking({
            taskId: task.taskId,
            timeTrackingSpent: timeSpend,
            timeTrackingRemaining: timeRemain
        })
            .then(() => {
                toast.success("Update task successful")
                dispatch(getTaskById(task.taskId))
            })
            .catch((error) => {
                toast.error(typeof error === "string" ? error : "Not have permission")
            })
    }

    const handleCloseTaskModal = () => {
        dispatch(getProjectDetail(selectedProject.id))
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
                {loading && !task ?
                    null :
                    (<header className={cx('header')}>
                        <div className={cx('headerLeft')}>
                            {/*--------------------- TASK TYPE -----------------------*/}
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
                                onChange={handleUpdateTaskType}
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
                                className={cx('headerBtn', 'deleteTaskBtn')}
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
                    </header>)
                }
            </DialogTitle>
            <DialogContent>
                {loading && !task ?
                    <SkeletonLoad /> :
                    (<section className={cx('body')}>
                        <div className={cx('left')}>
                            <div className={cx('titleWrapper')}>
                                {/*--------------------- TASK NAME -----------------------*/}
                                <TextField
                                    onBlur={handleUpdateTaskName}
                                    inputClass={cx('taskName')}
                                    type='textarea'
                                    rows='1'
                                    value={task?.taskName || ""}
                                    variant='trello'
                                    placeholder='Add short summary'
                                    autoHeight
                                />
                            </div>
                            <div className={cx('formGroup')}>
                                {/*--------------------- TASK DESCRIPTION -----------------------*/}
                                <h4>Description</h4>
                                <div className={cx('editor', { visible: isEditorVisible })}>
                                    <MyCkEditor
                                        data={task?.description}
                                        editorRef={descriptionRef}
                                        onFocus={handleOpenEditor}
                                        config={{ placeholder: "Add a description here ..." }}
                                    />
                                </div>
                                <div className={cx('descriptionControl', { visible: isEditorVisible })}>
                                    <Button solid primary onClick={handleUpdateDescription}>Save</Button>
                                    <Button solid onClick={handleCloseEditor}>Cancel</Button>
                                </div>
                            </div>
                            <div className={cx('formGroup', 'commentGroup')}>
                                {/*--------------------- TASK COMMENTS -----------------------*/}
                                <h4>Comments</h4>
                                <Comment />
                            </div>
                        </div>
                        <div className={cx('right')}>
                            <div className={cx('formGroup')}>
                                {/*--------------------- TASK STATUS -----------------------*/}
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
                                {/*--------------------- TASK ASSIGNMENT -----------------------*/}
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
                                            <div className={cx('assignment', { alreadyExist: task?.assigness.find(x => x.id === item.userId) })}>
                                                <Avatar src={item.avatar} sx={{ width: 24, height: 24 }} />
                                                <span>
                                                    {item.name}{selectedProject.creator.id === item.userId ? " 🔱 (Project owner)" : ""}
                                                </span>
                                            </div>
                                        )}
                                        getSearchKey={(item) => item.name}
                                        getItemsKey={(item) => item.userId}
                                        items={selectedProject?.members.concat([]) || []}
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
                                {/*--------------------- TASK PRIORITY -----------------------*/}
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
                                {/*--------------------- TASK ORIGINAL ESTIMATE -----------------------*/}
                                <h4>ORIGINAL ESTIMATE (HOURS)</h4>
                                <TextField
                                    variant='trello'
                                    type='number'
                                    value={task?.originalEstimate || 0}
                                    onBlur={handleChangeEstimate}
                                    min='0'
                                />
                            </div>
                            <div className={cx('formGroup')}>
                                {/*--------------------- TASK TIME TRACKING SPEND -----------------------*/}
                                <h4>Time spend (hours)</h4>
                                <TextField
                                    type='number'
                                    variant='trello'
                                    value={task?.timeTrackingSpent || 0}
                                    onBlur={handleChangeTime}
                                    ref={timeSpendRef}
                                    min='0'
                                />
                            </div>
                            <div className={cx('formGroup')}>
                                {/*--------------------- TASK TIME TRACKING REMAINING  -----------------------*/}
                                <h4>Time remaining (hours)</h4>
                                <TextField
                                    type='number'
                                    variant='trello'
                                    value={task?.timeTrackingRemaining || 0}
                                    ref={timeRemainRef}
                                    onBlur={handleChangeTime}
                                    min='0'
                                />
                            </div>
                            <div className={cx('formGroup')}>
                                {/*--------------------- TASK TIME TRACKING  -----------------------*/}
                                <h4>Time Tracking</h4>
                                <TimeTracking
                                    ref={timeTrackingRef}
                                    timeSpend={task?.timeTrackingSpent}
                                    timeRemain={task?.timeTrackingRemaining}
                                    label={false}
                                />
                            </div>
                        </div>
                    </section>)
                }
            </DialogContent>
        </Dialog>
    )
}

export default TaskDetailModal