import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ClearIcon from '@mui/icons-material/Clear';



import projectAPI from '../../../services/projectAPI'
import anothersAPI from '../../../services/anothersAPI'

import { getProjectDetail } from '../../../redux/slices/projectSlice'
import { taskTypeMap, priorityMap } from '../dummyData'

import Button from '../../../components/Button';
import MenuSelect from '../../../components/MenuSelect';
import MyCkEditor from '../../../components/MyCkEditor';
import { TextFieldV2 as TextField } from '../../../components/TextField';

import classnames from 'classnames/bind'
import styles from './TaskNewModal.module.scss'
import MultiSelectUser from './MultiSelectUser';
import { useParams } from 'react-router-dom';
import TimeTracking from '../../component/TimeTracking/TimeTracking';
const cx = classnames.bind(styles)


const TaskNewModal = forwardRef((_, ref) => {
    const { projectId } = useParams()
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()
    //dùng để xử lý UI
    const timeTrackingRef = useRef()

    //Dùng để lấy form value
    const taskTypeRef = useRef()
    const taskPriorityRef = useRef()
    const taskNameRef = useRef()
    const descriptionRef = useRef()
    const taskStatusRef = useRef()
    const taskAssignmentRef = useRef()
    const orinalEstimateRef = useRef()
    const timeRemaningRef = useRef()
    const timeSpendingRef = useRef()

    const modalMethod = {
        toggleModal: (boolean) => {
            setIsOpen(boolean)
        }
    }

    useImperativeHandle(ref, () => modalMethod)

    const handleCreateTask = async () => {
        try {
            const data = {
                "listUserAsign": taskAssignmentRef.current.getValue().map(item => item.userId),
                "taskName": taskNameRef.current.getValue(),
                "description": descriptionRef.current.getData(),
                "statusId": taskStatusRef.current.getValue()?.statusId,
                "originalEstimate": orinalEstimateRef.current.getValue(),
                "timeTrackingSpent": timeSpendingRef.current.getValue(),
                "timeTrackingRemaining": timeRemaningRef.current.getValue(),
                "projectId": projectId,
                "typeId": taskTypeRef.current.getValue()?.id,
                "priorityId": taskPriorityRef.current.getValue()?.priorityId
            }

            await projectAPI.createTask(data)
            toast.success("Create task success")
            dispatch(getProjectDetail(projectId))
            setIsOpen(false)

        } catch (error) {
            toast.error(error)
        }
    }

    // const handleResetForm = () => {
    //     taskTypeRef.current.setValue()
    //     taskPriorityRef.current.setValue()
    //     taskNameRef.current.setValue()
    //     descriptionRef.current.setData()
    //     taskStatusRef.current.setValue()
    //     taskAssignmentRef.current.setValue([])
    //     orinalEstimateRef.current.setValue(0)
    //     timeRemaningRef.current.setValue(0)
    //     timeSpendingRef.current.setValue(0)
    // }

    return (
        <Dialog
            open={isOpen}
            scroll="body"
            maxWidth='sm'
            fullWidth={true}
            onClose={() => setIsOpen(false)}
        >
            <DialogTitle>
                <header className={cx('header')}>
                    <div className={cx('headerLeft')}>
                        <h3>Create New Task</h3>
                    </div>
                    <div className={cx('headerRight')}>
                        <Button
                            className={cx('headerBtn')}
                            onClick={() => setIsOpen(false)}
                        >
                            <ClearIcon fontSize='inherit' color='inherit' />
                        </Button>
                    </div>
                </header>
            </DialogTitle>
            <DialogContent>
                <section className={cx('body')}>
                    <MenuSelect
                        serviceAPI={anothersAPI.getTaskType}
                        renderItem={(item) => (
                            <div className={cx('taskType')}>
                                {taskTypeMap[item.id]?.icon}
                                <span>
                                    {taskTypeMap[item.id]?.name}
                                </span>
                            </div>
                        )}
                        getSearchKey={(item) => item.taskType}
                        getItemsKey={(item) => item.id}
                        label='Task type'
                        selectPlaceHolder={"Select Task Type"}
                        ref={taskTypeRef}
                    />
                    <MenuSelect
                        serviceAPI={anothersAPI.getPriorities}
                        renderItem={(item) => (
                            <div className={cx('taskPriority')}>
                                {priorityMap[item.priorityId]?.icon}
                                <span>{item.priority}</span>
                            </div>
                        )}
                        getSearchKey={(item) => item.description}
                        getItemsKey={(item) => item.priorityId}
                        selectPlaceHolder={"Select Status"}
                        label='Priority'
                        ref={taskPriorityRef}
                    />
                    <MenuSelect
                        serviceAPI={anothersAPI.getTaskStatus}
                        renderItem={(item) => (
                            <div className={cx('taskStatus')}>
                                {item.statusName}
                            </div>
                        )}
                        label='Status'
                        getSearchKey={(item) => item.statusName}
                        getItemsKey={(item) => item.statusId}
                        selectPlaceHolder={"Select Status"}
                        arrow
                        ref={taskStatusRef}
                    />
                    <TextField
                        inputClass={cx('taskName')}
                        label='Short summary'
                        variant='trello'
                        ref={taskNameRef}
                    />
                    <MyCkEditor
                        label='Description'
                        editorRef={descriptionRef}
                    />
                    <MultiSelectUser ref={taskAssignmentRef} />
                    <div className={cx('formGroup')}>
                        <TextField
                            variant='trello'
                            label='Original estiamte (hours)'
                            type='number'
                            value={0}
                            ref={orinalEstimateRef}
                        />
                        <TimeTracking ref={timeTrackingRef} />
                    </div>
                    <div className={cx('formGroup')}>
                        <TextField
                            variant='trello'
                            label='Time remaining (hours)'
                            value={0}
                            type='number'
                            ref={timeRemaningRef}
                            onChange={(value) => { timeTrackingRef.current.setTimeRemaining(value) }}
                        />
                        <TextField
                            variant='trello'
                            label='Time spend (hours)'
                            value={0}
                            type='number'
                            ref={timeSpendingRef}
                            onChange={(value) => { timeTrackingRef.current.setTimeSpending(value) }}
                        />
                    </div>
                </section>
                <footer className={cx('footer')}>
                    <div className={cx('confirmBtnGroup')}>
                        <Button solid primary onClick={handleCreateTask}>Create task</Button>
                        <Button solid onClick={() => setIsOpen(false)}>Cancle</Button>
                    </div>
                </footer>
            </DialogContent>
        </Dialog>
    )
})

export default TaskNewModal