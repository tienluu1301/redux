import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

import Grid from '@mui/material/Unstable_Grid2';

import styles from './UserDetail.module.scss'
// import TableData from '../../components/TableData';
import Button from '../../components/Button';
import CustomLoadingOverlay from '../../components/TableData/CustomLoadingOverlay';
import CustomErrorOverLay from '../../components/TableData/CustomErrorOverLay';

import useRequest from '../../hooks/useRequest';
import userAPI from '../../services/userAPI';

import { getUsersDetail } from '../../redux/slices/userSlice'
import UserEditFormModal from './UserEditFormModal';

const UserDetail = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { selectedUser, loading, error } = useSelector(state => state.user)
    const deleteUser = useRequest(userAPI.deleteUser, { manual: true })

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        dispatch(getUsersDetail(userId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])


    const handleDelete = () => {
        deleteUser.runAsync(userId)
            .then(() => {
                toast.success("Delete user successfully")
                navigate(-1)
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    if (loading) {
        return <CustomLoadingOverlay />
    }

    if (error) {
        return <CustomErrorOverLay />
    }

    // const columns = [
    //     {
    //         field: "maVe",
    //         headerName: "Ticket ID",
    //         flex: 1,
    //         minWidth: 120
    //     },
    //     {
    //         field: "tenPhim",
    //         headerName: "Movie Name",
    //         flex: 2,
    //         minWidth: 260
    //     },
    //     {
    //         field: "thoiLuongPhim",
    //         headerName: "Range",
    //         flex: 1,
    //         minWidth: 80,
    //         valueGetter: (params) => params.row.thoiLuongPhim + "'"
    //     },
    //     {
    //         field: "giaVe",
    //         headerName: "Price",
    //         valueGetter: (params) => params.row?.giaVe?.toLocaleString("vn-VN") + ' VND',
    //         flex: 1,
    //         minWidth: 150
    //     },
    //     {
    //         field: "ngayDat",
    //         headerName: "Booking day",
    //         flex: 2,
    //         minWidth: 240
    //     }
    // ];

    return (
        <div className={styles.wrapper}>
            {/******** User information /********/}
            <div className={styles.title}>
                <h3>Basic Infomation</h3>
                <div className={styles.control}>
                    <Button solid onClick={() => setIsOpen(!isOpen)}>Edit</Button>
                    <Button solid onClick={handleDelete}>Delete</Button>
                </div>
            </div>
            <Grid container spacing={2}>
                <Grid xs={12} md={4} display='flex' alignItems="flex-start" justifyContent="center">
                    <div className={styles.avatar}>
                        <img src={selectedUser?.avatar} alt={selectedUser?.name} />
                    </div>
                </Grid>
                <Grid xs={12} md={8}>
                    <div className={styles.infoWrapper}>
                        <div className={styles.info}>
                            <p>Name:</p>
                            <span>{selectedUser?.name}</span>
                        </div>
                        <div className={styles.info}>
                            <p>Email:</p>
                            <span>{selectedUser?.email}</span>
                        </div>
                        <div className={styles.info}>
                            <p>Phone:</p>
                            <span>{selectedUser?.phoneNumber}</span>
                        </div>

                    </div>
                </Grid>
            </Grid>
            {/* <div className={styles.title}>
                <h3>Advandce Infomation</h3>
            </div> */}
            {/* <TableData
                            rows={selectedUser.thongTinDatVe || []}
                            columns={columns}
                            getRowId={(row) => row.maVe}
                            rowsPerPageOptions={[10]}
                            pageSize={10}
                            loading={loading}
                            error={error ? error : null}
                            autoHeight
                        /> */}
            {/******** Modal edit user **********/}
            <UserEditFormModal open={isOpen} onClose={() => setIsOpen(!isOpen)} />
        </div >
    )
}

export default UserDetail