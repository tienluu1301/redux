import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import TaskItem from './TaskItem/TaskItem'

import classnames from 'classnames/bind'
import styles from './TaskList.module.scss'
const cx = classnames.bind(styles)


const TaskList = ({ taskList = [], taskNewModalRef }) => {
    const handleToggleModal = () => {
        taskNewModalRef.current.toggleModal(true)
    }
    return (
        <ul className={cx('taskList')}>
            {taskList?.map(task => (
                <TaskItem key={task.taskId} task={task} />
            ))}
            <div className={cx('createTaskBtn')} onClick={handleToggleModal}>
                <AddIcon className={cx('addIcon')} />
                <span>Create issue</span>
            </div>
        </ul>
    )
}

export default TaskList