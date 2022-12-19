import { useRef, userState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import useRequest from '../../hooks/useRequest'
import anothersAPI from '../../services/anothersAPI'
import userAPI from '../../services/userAPI'
import projectAPI from '../../services/projectAPI'
import { getProjectDetail, reOrderTask } from '../../redux/slices/projectSlice'

import projectOwnerImg from '../../assets/images/avatar-gau-cute.jpg'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import MenuSelect from '../../components/MenuSelect'

import { Avatar, AvatarGroup, Tooltip } from '@mui/material'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined';
import AddIcon from '@mui/icons-material/Add';


import { DragDropContext } from 'react-beautiful-dnd'


import classnames from 'classnames/bind'
import styles from './KanbanBoard.module.scss'
import TaskList from './TaskList'
import TaskDetailModal from './TaskDetailModal'
import TaskNewModal from './TaskNewModal'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
const cx = classnames.bind(styles)

const StyledTooltip = ({ ...passProp }) => (
    <Tooltip
        arrow
        PopperProps={{
            sx: {
                "& .MuiTooltip-tooltip": {
                    fontSize: "1.2rem"
                }
            }
        }}
        disableInteractive
        {...passProp}
    />
)
const KanbanBoard = () => {
    const dispatch = useDispatch()
    const { projectId } = useParams()
    const { selectedProject } = useSelector(state => state.project)
    const { users } = useSelector(state => state.user)
    // const [filterByUserId, setFilterByUserId] = userState([])
    // const listTask = 
    const getStatus = useRequest(anothersAPI.getTaskStatus)
    const TaskNewModalRef = useRef()

    console.log("kanban board render")

    const handleAddUser = async (item, selectMethod) => {
        try {
            await projectAPI.addUserToProject({
                userId: item.userId,
                projectId: projectId
            })
            toast.success("Invite peeple to the project success")
            dispatch(getProjectDetail(projectId))
        } catch (error) {
            toast.error(error)
        }
    }

    const handleRemoveUser = async (item) => {
        try {
            await projectAPI.removeUserFromProject({
                userId: item.userId,
                projectId: projectId
            })
            toast.success("Kich user out the project success")
            dispatch(getProjectDetail(projectId))
        } catch (error) {
            toast.error(error)
        }
    }

    // const handleToggleFilter = (id) => {
    //     console.log(id)
    //     setFilterByUserId(prev => {
    //         if (prev.find(item => item === id)) {
    //             return [...prev.filter(item => item !== id)]
    //         }
    //         else {
    //             return [...prev, id]
    //         }
    //     })
    // }

    const handleToggleModal = () => {
        TaskNewModalRef.current.toggleModal(true)
    }

    const handleDropEnd = (result) => {
        const { destination, source, draggableId } = result
        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return
        }

        dispatch(reOrderTask(result))
        projectAPI.updateTaskStatus({
            taskId: draggableId,
            statusId: destination.droppableId
        })
            .then(() => {
                toast.success("Update success")
            })
            .catch((error) => {
                toast.error(error)
                dispatch(getProjectDetail(projectId))
            })
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter')}>
                <div className={cx('search')}>
                    <SearchBar />
                </div>
                <div className={cx('creatorAvatar')}>
                    <StyledTooltip
                        title={selectedProject?.creator.name + " 🔱 (Project owner)"}
                        arrow
                        enterDelay={200}
                    >
                        <Avatar
                            className={cx('memberAvatar')}
                            src={projectOwnerImg}
                            alt={selectedProject?.creator.name}
                        />
                    </StyledTooltip>
                </div>
                <div className={cx('groupAvatar')}>
                    <MenuSelect
                        items={users || []}
                        maxRender={5}
                        serviceAPI={userAPI.getUsers}
                        renderItem={(item) => (
                            <div className={cx('memberItem')}>
                                <Avatar src={item.avatar} sx={{ width: 24, height: 24 }} />
                                <span>
                                    {item.name}
                                </span>
                                {selectedProject?.members.find(member => member.userId === item.userId) ? "✅" : null}
                                {item.userId === selectedProject?.creator.id ? ' 🔱 ' : null}
                            </div>
                        )}
                        onChange={handleAddUser}
                        getSearchKey={(item) => item.name}
                        getItemsKey={(item) => item.userId}
                        rootClass={cx('manageUserBtnWrapper')}
                        defaultPlaceHolder={(
                            <StyledTooltip title="Add people">
                                <button className={cx('manageUserBtn')}>
                                    <PersonAddAltOutlinedIcon fontSize='inherit' color='inherit' />
                                </button>
                            </StyledTooltip>
                        )}
                    />
                    <MenuSelect
                        items={selectedProject?.members || []}
                        maxRender={5}
                        renderItem={(item) => (
                            <div className={cx('memberItem')}>
                                <Avatar src={item.avatar} sx={{ width: 24, height: 24 }} />
                                <span>
                                    {item.name}
                                </span>
                                {item.userId === selectedProject?.creator.id ? ' 🔱 ' : null}
                                <div className={cx('removeUserBtn')}>
                                    <button onClick={() => { handleRemoveUser(item) }}>X</button>
                                </div>
                            </div>
                        )}
                        // onChange={handleAddUser}
                        hideOnSelect={false}
                        getSearchKey={(item) => item.name}
                        getItemsKey={(item) => item.userId}
                        rootClass={cx('manageUserBtnWrapper')}
                        defaultPlaceHolder={(
                            <StyledTooltip title="Remove people">
                                <button className={cx('manageUserBtn')}>
                                    <GroupRemoveOutlinedIcon fontSize='inherit' color='inherit' />
                                </button>
                            </StyledTooltip>
                        )}
                    />
                    <AvatarGroup
                        total={selectedProject?.members.length}
                        sx={{
                            '& .MuiAvatar-root': { width: 36, height: 36, fontSize: 15 },
                        }}
                    >
                        {selectedProject?.members.map(item => (
                            <StyledTooltip
                                key={item.userId}
                                title={item.name}
                                // arrow
                                enterDelay={200}
                            >
                                <Avatar
                                    className={cx('memberAvatar')}
                                    src={item.avatar}
                                    alt={item.name}
                                />
                            </StyledTooltip>
                        ))}
                    </AvatarGroup>
                </div>
                <div className={cx('controlBtn')}>
                    <Button solid small>Only My Issues</Button>
                    <Button solid small>Recently Update</Button>
                </div>
            </div>
            <DragDropContext onDragEnd={handleDropEnd}>
                <div className={cx('content')}>
                    {getStatus.data?.map(status => (
                        <div key={status.statusId} className={cx("statusColumn")}>
                            <h3>{status.statusName}</h3>
                            <div className={cx('tasksContainer')}>
                                <TaskList taskList={selectedProject?.lstTask[status.statusId]} taskNewModalRef={TaskNewModalRef} />
                                <div className={cx('createTaskBtn')} onClick={handleToggleModal}>
                                    <AddIcon className={cx('addIcon')} />
                                    <span>Create issue</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </DragDropContext>
            <TaskDetailModal />
            <TaskNewModal ref={TaskNewModalRef} />
        </div>
    )
}

export default KanbanBoard