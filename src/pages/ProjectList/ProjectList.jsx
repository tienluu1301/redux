import { useEffect } from 'react'
import classnames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './ProjectList.module.scss'
import Button from '../../components/Button'
import MoreMenu from '../../components/MoreMenu'
import SearchBar from '../../components/SearchBar'
import TableData from '../../components/TableData'

import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import Tooltip from '@mui/material/Tooltip';


import { getProjects } from '../../redux/slices/projectSlice'
const cx = classnames.bind(styles)

const ProjectList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { projects } = useSelector(state => state.project)

    useEffect(() => {
        dispatch(getProjects())
    }, [])

    const handleSelect = (action, id) => {
        if (action === 'detail') {
            navigate(`/jira/projects/${id}/kanban-board`)
        }

        if (action === 'setting') {

        }

        if (action === 'delete') {

        }
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
                    <AvatarGroup
                        max={4}
                        total={params.value.lenght}
                        sx={{
                            '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                        }}
                    >
                        {params.value?.map(item => (
                            <Tooltip
                                key={item.userId}
                                title={item.name}
                                arrow
                                PopperProps={{
                                    sx: {
                                        "& .MuiTooltip-tooltip": {
                                            fontSize: "1.2rem"
                                        }
                                    }
                                }}
                            >
                                <Avatar
                                    key={item.userId}
                                    src={item?.avatar}
                                    alt={item.name}
                                    variant="circular"
                                />
                            </Tooltip>
                        ))
                        }
                    </AvatarGroup >
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
                    <MoreMenu items={actions} placement='bottom-end' onChange={({ action }) => { handleSelect(action, params.row.id) }}>
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
                <div className={cx('control')}>
                    <Button solid primary>Create Task</Button>
                    <Button solid primary>Create project</Button>
                </div>
            </div>
            <div className={cx('filter')}>
                <SearchBar />
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
                // loading={loading}
                // error={error ? error : null}
                />
            </div>
        </div>
    )
}

export default ProjectList