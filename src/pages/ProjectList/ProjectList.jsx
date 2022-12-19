import { useEffect } from 'react'
import classnames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, useSearchParams } from 'react-router-dom'

import styles from './ProjectList.module.scss'
import MenuSelect from '../../components/MenuSelect'
import MoreMenu from '../../components/MoreMenu'
import SearchBar from '../../components/SearchBar'
import TableData from '../../components/TableData'
import ProjectForm from '../component/NewProjectForm'

import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import Tooltip from '@mui/material/Tooltip';


import { getProjects } from '../../redux/slices/projectSlice'
import useRequest from '../../hooks/useRequest'
import projectAPI from '../../services/projectAPI'
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


const ProjectList = () => {
    const { projects, loading, error } = useSelector(state => state.project)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const createProject = useRequest(projectAPI.createProject, { manual: true })
    const deleteProject = useRequest(projectAPI.deleteProject, { manual: true })

    const [searchParams, setSearchParams] = useSearchParams()
    const searchValue = searchParams.get('keyword') || ''

    useEffect(() => {
        // if (projects) return
        dispatch(getProjects(searchValue))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearchParams = (debounceValue) => {
        dispatch(getProjects(debounceValue))

        // kiểm tra xem nếu input có giá trị thì mới set query params,
        //  nếu không có input value thì xóa qrery params
        if (!debounceValue) {
            setSearchParams()
            return
        }
        setSearchParams({ keyword: debounceValue })
    }

    const handleCreateProject = async (values, formMethod) => {
        try {
            const createdProject = await createProject.runAsync(values)
            await projectAPI.addUserToProject({
                userId: createdProject.creator,
                projectId: createdProject.id
            })

            dispatch(getProjects(searchValue))
            formMethod.reset()
            toast.success(`Create project ${values.projectName} successful`)
        } catch (error) {
            toast.error(typeof error === 'string' ? error : JSON.stringify(error))
        }
    }
    const handleSelectOptions = (action, id) => {
        if (action === 'detail') {
            navigate(`/jira/projects/${id}/kanban-board`)
        }

        if (action === 'setting') {
            navigate(`/jira/projects/${id}/project-setting`)
        }

        if (action === 'delete') {
            deleteProject.runAsync(id)
                .then(() => {
                    dispatch(getProjects(searchValue))
                    toast.success("Delete project success")
                })
                .catch((error) => {
                    toast.error("Delete project success")
                })
        }
    }

    const handleSelectUser = (item) => {
        navigate(`/jira/users/${item.userId}`)
    }

    const actions = [
        {
            title: "Detail",
            icon: <FactCheckOutlinedIcon />,
            action: 'detail'
        },
        {
            title: "Setting",
            icon: <EditOutlinedIcon />,
            action: 'setting'
        },
        {
            title: "Delete",
            icon: <DeleteOutline />,
            action: 'delete'
        }
    ]

    const columns = [
        {
            field: "projectName",
            headerName: "Name",
            flex: 3,
            minWidth: 200
        },
        {
            field: "categoryName",
            headerName: "Category",
            flex: 2,
            minWidth: 150
        },
        {
            field: "creator",
            headerName: "Creator",
            flex: 2,
            minWidth: 150,
            renderCell: (params) => params.value.name
        },
        {
            field: "members",
            headerName: "Member",
            flex: 2,
            minWidth: 150,
            renderCell: (params) => {
                return (
                    <MenuSelect
                        items={params.value}
                        maxRender={3}
                        stepRender={2}
                        renderItem={(item) => (
                            <div className={cx('memberItem')}>
                                <Avatar
                                    src={item.avatar}
                                    sx={{
                                        width: 24,
                                        height: 24
                                    }}
                                />
                                <span>
                                    {item.name}
                                </span>
                                {item.userId === params.row.creator.id ? ' 🔱 Creator' : null}
                            </div>
                        )}
                        getSearchKey={(item) => item.name}
                        getItemsKey={(item) => item.userId}
                        rootClass={cx('memberWrapper')}
                        onChange={handleSelectUser}
                        defaultPlaceHolder={(
                            <AvatarGroup
                                max={4}
                                total={params.value.lenght}
                                sx={{
                                    '& .MuiAvatar-root': {
                                        width: 24,
                                        height: 24,
                                        fontSize: 15
                                    },
                                }}
                            >
                                {params.value?.map(item => (
                                    <StyledTooltip
                                        key={item.userId}
                                        title={item.name}
                                    >
                                        <Avatar
                                            className={cx('memberAvatar')}
                                            key={item.userId}
                                            src={item?.avatar}
                                            alt={item.name}
                                            variant="circular"
                                        />
                                    </StyledTooltip>
                                ))
                                }
                            </AvatarGroup >
                        )}
                    />
                )
            }
        },
        {
            field: "action",
            headerName: "More",
            description: "Do more action with this",
            sortable: false,
            flex: 1,
            minWidth: 80,
            renderCell: (params) => {
                return (
                    <MoreMenu
                        items={actions}
                        placement='bottom-end'
                        onChange={({ action }) => {
                            handleSelectOptions(action, params.row.id)
                        }}
                    >
                        <MoreHorizOutlinedIcon />
                    </MoreMenu>
                );
            },
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ]
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>Projects</h2>
            </div>
            <div className={cx('filter')}>
                <SearchBar
                    placeholder="Search project here"
                    value={searchValue}
                    loading={searchValue && loading}
                    onClearSearchValue={() => setSearchParams()}
                    options={{
                        debounce: true,
                        time: 400,
                        onDebounce: handleSearchParams
                    }}
                />
            </div>
            <div className={cx('container')}>
                <TableData
                    rows={projects || []}
                    columns={columns}
                    getRowId={(row) => row.id}
                    getEstimatedRowHeight={() => 100}
                    autoRowHeight
                    sx={{
                        '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '4px' },
                        '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '4px' },
                        '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '4px' },
                    }}
                    loading={loading}
                    error={error ? error : null}
                />
            </div>
            <ProjectForm onSubmit={handleCreateProject} />
        </div>
    )
}

export default ProjectList