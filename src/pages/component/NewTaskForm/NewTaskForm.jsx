import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'

import TextField from '../../../components/TextField'
import Button from '../../../components/Button/Button'
import MyCkEditor from '../../../components/MyCkEditor/MyCkEditor'
import MenuSelect from '../../../components/MenuSelect'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Avatar } from '@mui/material';

import anothersAPI from '../../../services/anothersAPI'
import projectAPI from '../../../services/projectAPI'
import { taskTypeMap, priorityMap } from '../../KanbanBoard/dummyData'

import classnames from 'classnames/bind'
import styles from './ProjectForm.module.scss'
import { useSelector } from 'react-redux'
const cx = classnames.bind(styles)

const ProjectForm = ({ onSubmit }) => {
    const [open, setOpen] = useState(false)
    const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            taskName: "",
            projectName: "",
        }
    })
    const { projects, selectedProject } = useSelector(state => state.project)
    // {
    //     "listUserAsign": [
    //       0
    //     ],
    //     "taskName": "string",
    //     "description": "string",
    //     "statusId": "string",
    //     "originalEstimate": 0,
    //     "timeTrackingSpent": 0,
    //     "timeTrackingRemaining": 0,
    //     "projectId": 0,
    //     "typeId": 0,
    //     "priorityId": 0
    //   }
    const handleOpenForm = () => {
        setOpen(true)
    }

    const handleCloseForm = (e) => {
        e.preventDefault()
        setOpen(false)
    }

    // Dùng để lưu lại editor instance sau khi editor được khởi tạo
    const editorRef = useRef()
    const selectRef = useRef()

    const formMethod = {
        reset: (...params) => {
            reset(...params)
            editorRef.current.setData('')
            selectRef.current.setValue()
        },
        closeForm: handleCloseForm
    }

    const handleOnSubmit = async (values) => {
        onSubmit({
            ...values,
            description: editorRef.current.getData(),
            categoryId: selectRef.current.getValue()?.id
        }, formMethod)
    }

    console.log("form render")

    return createPortal((
        <div>
            <div className={cx('wrapper', { open })} >
                <div className={cx("title")}>
                    <h2>Create Project</h2>
                </div>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className={cx('container')}>
                        <div className={cx('group')}>
                            <MenuSelect
                                serviceAPI={projects}
                                value={selectedProject}
                                renderItem={(item) => (
                                    <div className={cx('taskStatus')}>
                                        {item.projectName}
                                    </div>
                                )}
                                getSearchKey={(item) => item.projectName}
                                getItemsKey={(item) => item.id}
                                // onChange={handleChangeStatus}
                                selectPlaceHolder={"Select Project"}
                                arrow
                            />
                            <TextField
                                label="Task Name"
                                variant="trello"
                                {...register("taskName", { required: true })}
                                error={errors.taskName ? "Task Name is required" : null}
                            />
                        </div>
                        <div className={cx('group')}>
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
                                selectPlaceHolder={"Select Task Type"}
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
                            // onChange={handleChangePriority}
                            />
                        </div>
                        <div className={cx('group')}>
                            <div className={cx('memberWrapper')}>
                                {/* {task?.assigness.map(item => (
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
                            <MenuSelect
                                serviceAPI={anothersAPI.getTaskStatus}
                                renderItem={(item) => (
                                    <div className={cx('taskStatus')}>
                                        {item.statusName}
                                    </div>
                                )}
                                getSearchKey={(item) => item.statusName}
                                getItemsKey={(item) => item.statusId}
                                // onChange={handleChangeStatus}
                                selectPlaceHolder={"Select Status"}
                                arrow
                            />
                        </div>
                        <div className={cx('group')}>
                            <TextField
                                variant='trello'
                            // onBlur={handleChangeEstimate}
                            />
                            <TextField
                                variant='trello'
                            // onBlur={handleChangeEstimate}
                            />
                        </div>
                        <div className={cx('group')}>
                            <TextField
                                variant='trello'
                            // onBlur={handleChangeEstimate}
                            />
                            <TextField
                                variant='trello'
                            // onBlur={handleChangeEstimate}
                            />
                        </div>

                        <MyCkEditor
                            label='Description'
                            editorRef={editorRef}
                        />
                        <div className={cx('formControl')}>
                            <Button solid primary className={cx('submitBtn')}>Create</Button>
                            <Button solid className={cx('submitBtn')} onClick={handleCloseForm}>Cancel</Button>
                        </div>
                    </div>
                </form>
                <button className={cx('closeBtn')} onClick={handleCloseForm}>X</button>
            </div>
            <div className={cx("overlay", { open })} onClick={handleCloseForm}></div>
        </div>
    ), document.body)
}

export default ProjectForm