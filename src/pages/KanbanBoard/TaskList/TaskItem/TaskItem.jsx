import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

import { Avatar, AvatarGroup, Tooltip } from '@mui/material'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

import MoreMenu from '../../../../components/MoreMenu'

import { getTaskById, toggleTaskModal } from '../../../../redux/slices/taskSlice'
import { getProjectDetail } from '../../../../redux/slices/projectSlice'
import projectAPI from '../../../../services/projectAPI'
import { taskTypeMap, priorityMap } from '../../dummyData'


import classnames from 'classnames/bind'
import styles from './TaskItem.module.scss'
import { toast } from 'react-toastify';
const cx = classnames.bind(styles)


const itemsMenu = [
    {
        title: "Delete",
        action: "delete"
    }
]

const TaskItem = ({ task }) => {
    const { projectId } = useParams()
    const dispatch = useDispatch()
    console.log("taskItem render")
    const handleSelectTask = () => {
        dispatch(toggleTaskModal(true))
        dispatch(getTaskById(task.taskId))
    }

    const handleDeleteTask = async () => {
        try {
            await projectAPI.deleteTask(task.taskId)
            toast.success("Delete task success")
            dispatch(getProjectDetail(projectId))
        } catch (error) {
            toast.error(error)
        }
    }

    const handleSelectMenu = (item) => {
        if (item.action === 'delete') {
            handleDeleteTask(task.taskId)
        }
    }

    return (
        <li className={cx('taskItem')} onClick={handleSelectTask}>
            <div className={cx('title')}>
                <h4>{task.taskName}</h4>
                <MoreMenu
                    items={itemsMenu}
                    placement='bottom-end'
                    appendTo={() => document.body}
                    rootActiveClass={cx("taskMenuActive")}
                    onChange={handleSelectMenu}
                >
                    <button
                        className={cx('taskActionBtn')}
                    >
                        <MoreHorizOutlinedIcon fontSize='inherit' color='inherit' />
                    </button>
                </MoreMenu>
            </div>
            <div className={cx('taskInfo')}>
                <div className={cx('left')}>
                    <AvatarGroup
                        max={4}
                        total={task.assigness.length}
                        sx={{
                            '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                        }}
                    >
                        {task.assigness.map(item => (
                            <Tooltip
                                key={item.id}
                                title={item.name}
                                arrow
                                PopperProps={{
                                    sx: {
                                        "& .MuiTooltip-tooltip": {
                                            fontSize: "1rem"
                                        }
                                    }
                                }}
                            >
                                <Avatar src={item.avatar} alt={item.name} />
                            </Tooltip>
                        ))}
                    </AvatarGroup>
                </div>
                <div className={cx('right')}>
                    <div className={cx('taskType')}>
                        <Tooltip
                            title={taskTypeMap[task.taskTypeDetail.id].name}
                            arrow
                            PopperProps={{
                                sx: {
                                    "& .MuiTooltip-tooltip": {
                                        fontSize: "1rem"
                                    }
                                }
                            }}
                        >
                            {taskTypeMap[task.taskTypeDetail.id].icon}
                        </Tooltip>
                    </div>
                    <div className={cx('taskPriority')}>
                        <Tooltip
                            title={priorityMap[task.priorityTask.priorityId].name}
                            arrow
                            PopperProps={{
                                sx: {
                                    "& .MuiTooltip-tooltip": {
                                        fontSize: "1rem"
                                    }
                                }
                            }}
                        >
                            {priorityMap[task.priorityTask.priorityId].icon}
                        </Tooltip>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default TaskItem