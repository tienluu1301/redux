import { useState } from 'react'
import { useForm } from 'react-hook-form'

import TextField from '../../../components/TextField'
import Button from '../../../components/Button/Button'


import classnames from 'classnames/bind'
import styles from './NewUserForm.module.scss'
const cx = classnames.bind(styles)

const NewUserForm = ({ onSubmit }) => {
    const [open, setOpen] = useState(false)
    const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            phoneNumber: "",
        }
    })

    const handleOpenForm = () => {
        setOpen(true)
    }

    const handleCloseForm = (e) => {
        e.preventDefault()
        setOpen(false)
    }

    const handleOnSubmit = async (values) => {
        onSubmit({
            ...values
        }, formMethod)
    }

    const formMethod = {
        reset: (...params) => {
            reset(...params)
        },
        setValue: (...params) => {
            setValue(...params)
        },
        closeForm: handleCloseForm
    }

    return (
        <>
            <div className={cx('controlBtn')} onClick={handleOpenForm}>
                <Button solid primary>Add User</Button>
            </div>
            <div className={cx('wrapper', { open })} >
                <div className={cx('innerWrapper')}>
                    <div className={cx("title")}>
                        <h2>Add New User</h2>
                    </div>
                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className={cx('container')}>
                            <TextField
                                label="Email"
                                variant="trello"
                                {...register("email", { required: true })}
                                error={errors.email ? "Email is required" : null}
                            />
                            <TextField
                                label="Password"
                                variant="trello"
                                {...register("password", { required: true })}
                                error={errors.password ? "Password is required" : null}
                            />
                            <TextField
                                label="User name"
                                variant="trello"
                                {...register("name", { required: true })}
                                error={errors.name ? "Name is required" : null}
                            />
                            <TextField
                                label="Phone number"
                                variant="trello"
                                {...register("phoneNumber", { required: true })}
                                error={errors.phoneNumber ? "Phone number is required" : null}
                            />
                            <div className={cx('formControl')}>
                                <Button solid primary className={cx('submitBtn')}>Create</Button>
                                <Button solid className={cx('submitBtn')} onClick={handleCloseForm}>Cancel</Button>
                            </div>
                        </div>
                    </form>
                </div>
                <button className={cx('closeBtn')} onClick={handleCloseForm}>X</button>
            </div>
            <div className={cx("overlay", { open })} onClick={handleCloseForm}></div>
        </>
    )
}

export default NewUserForm