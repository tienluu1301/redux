import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';

import Grid from '@mui/material/Unstable_Grid2';

import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import TextField from '../../../components/TextField';

import { getUsersDetail } from '../../../redux/slices/userSlice'
import useRequest from '../../../hooks/useRequest'
import userAPI from '../../../services/userAPI'

import styles from './UserEditFormModal.module.scss'

const UserEditFormModal = ({ open, onClose }) => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.user)

    const updateUser = useRequest(userAPI.updateUser, { manual: true })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            id: "",
            name: "",
            email: "",
            phoneNumber: "",
            password: ""
        }
    })

    const handleToggle = (evt) => {
        evt.preventDefault()
        reset()
        onClose()
    }

    useEffect(() => {
        if (!open) return
        for (let [key, value] of Object.entries(selectedUser)) {
            if (key === "userId") key = "id"
            setValue(key, value)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const onSubmit = async (values) => {
        updateUser.runAsync(values)
            .then(() => {
                toast.success("Update user successfully")
                onClose()
                dispatch(getUsersDetail(userId))
            })
            .catch(error => {
                toast.error(error)
            })
    }

    return (
        <Modal
            open={open}
            title="Edit User"
            onClose={handleToggle}
            footer={(
                <>
                    <div className={styles.control}>
                        <Button
                            solid
                            onClick={handleSubmit(onSubmit)}
                            disable={updateUser.loading}
                        >
                            Update
                        </Button>
                        <Button
                            solid
                            onClick={handleToggle}
                        >
                            Cancel
                        </Button>
                    </div>
                    {updateUser.error &&
                        <p className={styles.errorMess}>{updateUser.error}</p>}
                </>
            )}
        >
            <form >
                <Grid container spacing={4} disableEqualOverflow>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="id"
                            readOnly
                            disabled
                            {...register("id", {
                                required: {
                                    value: true,
                                    message: "Id is required"
                                }
                            })}
                            error={errors?.id?.message}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name is required"
                                }
                            })}
                            error={errors?.name?.message}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Email"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is required"
                                }
                            })}
                            error={errors?.email?.message}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Phone Number"
                            {...register("phoneNumber", {
                                required: {
                                    value: true,
                                    message: "Phone Number is required"
                                }
                            })}
                            error={errors?.phoneNumber?.message}
                        />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            label="Password"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required"
                                }
                            })}
                            error={errors?.password?.message}
                        />
                    </Grid>
                </Grid>
            </form>
        </Modal>
    )
}

export default UserEditFormModal