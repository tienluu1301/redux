import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import useRequest from '../../hooks/useRequest'
import anothersAPI from '../../services/anothersAPI'
import userAPI from '../../services/userAPI'
import projectAPI from '../../services/projectAPI'
import { getProjectDetail } from '../../redux/slices/projectSlice'

import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import MenuSelect from '../../components/MenuSelect'

import { Avatar, AvatarGroup, Tooltip } from '@mui/material'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import classnames from 'classnames/bind'
import styles from './KanbanBoard.module.scss'
import TaskList from './TaskList'
import TaskDetailModal from './TaskDetailModal'
import TaskNewModal from './TaskNewModal'
import { toast } from 'react-toastify'
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
    const { selectedProject } = useSelector(state => state.project)
    const { users } = useSelector(state => state.user)
    // const listTask = 
    const getStatus = useRequest(anothersAPI.getTaskStatus)
    const TaskNewModalRef = useRef()

    console.log("kanban board render")

    const handleAddUser = async (item, selectMethod) => {
        try {
            await projectAPI.addUserToProject({
                userId: item.userId,
                projectId: selectedProject.id
            })
            toast.success("Add peeple to project success")
            dispatch(getProjectDetail(selectedProject.id))
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter')}>
                <div className={cx('search')}>
                    <SearchBar />
                </div>
                <div className={cx('groupAvatar')}>
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
                    <MenuSelect
                        // onChange={handleAddUser}
                        items={users || []}
                        maxRender={5}
                        serviceAPI={userAPI.getUsers}
                        renderItem={(item) => (
                            <div className={cx('memberItem', {
                                alreadyHave: selectedProject?.members.find(member => member.userId === item.userId)
                            })}>
                                <Avatar src={item.avatar} sx={{ width: 24, height: 24 }} />
                                <span>
                                    {item.name}
                                </span>
                            </div>
                        )}
                        onChange={handleAddUser}
                        getSearchKey={(item) => item.name}
                        getItemsKey={(item) => item.userId}
                        rootClass={cx('addUserBtnWrapper')}
                        defaultPlaceHolder={(
                            <StyledTooltip title="Add people">
                                <button className={cx('addUserBtn')}>
                                    <PersonAddAltOutlinedIcon fontSize='inherit' color='inherit' />
                                </button>
                            </StyledTooltip>
                        )}
                    />
                </div>
                <div className={cx('controlBtn')}>
                    <Button solid small>Only My Issues</Button>
                    <Button solid small>Recently Update</Button>
                </div>
            </div>
            <div className={cx('content')}>
                {getStatus.data?.map(status => (
                    <div key={status.statusId} className={cx("statusColumn")}>
                        <h3>{status.statusName}</h3>
                        <div className={cx('tasksContainer')}>
                            <TaskList taskList={selectedProject?.lstTask[status.statusId].lstTaskDeTail} taskNewModalRef={TaskNewModalRef} />
                        </div>
                    </div>
                ))}
            </div>
            <TaskDetailModal />
            <TaskNewModal ref={TaskNewModalRef} />
        </div>
    )
}

export default KanbanBoard