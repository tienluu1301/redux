import { useEffect } from 'react'
import classnames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import styles from './UserList.module.scss'
import Button from '../../components/Button'
import MoreMenu from '../../components/MoreMenu'
import SearchBar from '../../components/SearchBar'
import TableData from '../../components/TableData'
// import UserEditForm from './UserEditForm'

import Avatar from '@mui/material/Avatar'

import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';


import { getUsers } from '../../redux/slices/userSlice'
import useRequest from '../../hooks/useRequest'
import userAPI from '../../services/userAPI'
const cx = classnames.bind(styles)

const UserList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)

    const deleteUser = useRequest(userAPI.deleteUser, { manual: true })

    useEffect(() => {
        dispatch(getUsers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSelect = (action, id) => {
        if (action === 'detail') {
            navigate(`/jira/users/${id}`)
            return
        }

        if (action === 'edit') {
            navigate(`/jira/users/${id}`)
            return
        }

        if (action === 'delete') {
            console.log(deleteUser)
            deleteUser.runAsync(id)
                .then(() => {
                    toast.success('Delete user successfull')
                    dispatch(getUsers())
                })
                .catch((error) => {
                    toast.error(error)
                })
            return
        }
    }

    const actions = [
        {
            title: "Detail",
            icon: <FactCheckOutlinedIcon />,
            action: 'detail'
        },
        {
            title: "Edit",
            icon: <EditOutlinedIcon />,
            action: 'edit'
        },
        {
            title: "Delete",
            icon: <DeleteOutline />,
            action: 'delete'
        }
    ]

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 2,
            minWidth: 150
        },
        {
            field: "avatar",
            headerName: "Avatar",
            flex: 1,
            minWidth: 80,
            renderCell: (params) => (
                <Avatar
                    src={params.value}
                    variant='circular'
                    sx={{
                        width: 24, height: 24
                    }}
                />
            )
        },
        {
            field: "email",
            headerName: "Email",
            flex: 3,
            minWidth: 200,
            renderCell: (params) => params.value.name
        },
        {
            field: "phoneNumber",
            headerName: "Phone",
            flex: 2,
            minWidth: 150,
            renderCell: (params) => params.value.name
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
                    <MoreMenu items={actions} placement='bottom-end' onChange={({ action }) => { handleSelect(action, params.row.userId) }}>
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
                <h2>Users</h2>
                <div className={cx('control')}>
                    <Button solid primary>Add user</Button>
                </div>
            </div>
            <div className={cx('filter')}>
                <SearchBar />
            </div>
            <div className={cx('container')}>
                <TableData
                    rows={users || []}
                    columns={columns}
                    getRowId={(row) => row.userId}
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
            {/* <UserEditForm /> */}
        </div>
    )
}

export default UserList