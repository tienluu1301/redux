import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
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
import TextField from '../../../components/TextField';

import { Avatar } from '@mui/material';

import classnames from 'classnames/bind'
import styles from './TaskNewModal.module.scss'
const cx = classnames.bind(styles)



const FakeEditor = ({ value, ...passProps }) => {
    const ref = useRef()
    useEffect(() => {
        ref.current.innerHTML = value
    }, [value])
    return <div ref={ref} {...passProps}></div>
}


const TaskNewModal = forwardRef((_, ref) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const descriptionRef = useRef()

    // const { task, isTaskModalOpen } = useSelector(state => state.task)
    const { selectedProject } = useSelector(state => state.project)
    const { user } = useSelector(state => state.auth)


    const modalMethod = {
        toggleModal: (boolean) => {
            setIsOpen(boolean)
        }
    }
    useImperativeHandle(ref, () => modalMethod)



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
                        placement='bottom-start'
                        getSearchKey={(item) => item.taskType}
                        getItemsKey={(item) => item.id}
                        label='Task type'
                        selectPlaceHolder={"Select Task Type"}
                    />
                    <MenuSelect
                        serviceAPI={anothersAPI.getPriorities}
                        // value={task?.priorityTask}
                        renderItem={(item) => (
                            <div className={cx('taskPriority')}>
                                {priorityMap[item.priorityId]?.icon}
                                <span>{item.priority}</span>
                            </div>
                        )}
                        getSearchKey={(item) => item.description}
                        getItemsKey={(item) => item.priorityId}
                        selectPlaceHolder={"Select Status"}
                        // onChange={handleChangePriority}
                        label='Priority'
                    />
                    <TextField
                        inputClass={cx('taskName')}
                        label='Short summary'
                        variant='trello'
                    />
                    <MyCkEditor
                        label='Description'
                        editorRef={descriptionRef}
                    />
                    <MenuSelect
                        serviceAPI={anothersAPI.getTaskStatus}
                        renderItem={(item) => (
                            <div className={cx('taskStatus')}>
                                {item.statusName}
                            </div>
                        )}
                        maxRender={1}
                        label='Status'
                        getSearchKey={(item) => item.statusName}
                        getItemsKey={(item) => item.statusId}
                        // onChange={handleChangeStatus}
                        selectPlaceHolder={"Select Status"}
                        arrow
                    />
                    <div className={cx('formGroup')}>
                        <h4>ASSIGNMENT</h4>
                        <div className={cx('memberWrapper')}>
                            {/* {task?.assigness.map(item => (
                                <div className={cx('member')} key={item.id}>
                                    <Avatar src={item.avatar} sx={{ width: 24, height: 24 }} />
                                    <span>{item.name}</span>
                                    <button
                                        className={cx('removeMemberBtn')}
                                    // onClick={() => handleRemoveUser(item.id)}
                                    >
                                        <ClearIcon fontSize='inherit' color='inherit' />
                                    </button>
                                </div>
                            ))} */}
                            <MenuSelect
                                // onChange={handleAddUser}
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
                        <h4>ORIGINAL ESTIMATE (HOURS)</h4>
                        <TextField
                            variant='trello'
                        // onBlur={handleChangeEstimate}
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
                </section>
            </DialogContent>
        </Dialog>
    )
})

export default TaskNewModal