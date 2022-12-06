import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';

import { LeftBackGround, Logo, RightBackGround } from '../../components/SVG'
import Button from '../../components/Button'
import TextField from '../../components/TextField'

import useRequest from '../../hooks/useRequest'
import userAPI from '../../services/userAPI'

import styles from './Register.module.scss'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            phoneNumber: ""
        }
    })

    const { runAsync, loading, error } = useRequest(userAPI.signup, { manual: true })
    const [isAccept, setIsAccept] = useState(false)
    const navigate = useNavigate()

    const onSubmit = (values) => {
        runAsync(values)
            .then(() => {
                toast.success("Register successfully!")
                navigate('/login', {
                    state: {
                        email: values.email,
                        password: values.password
                    }
                })
            })
            .catch(error => {
                toast.error(error)
            })
    }

    return (
        <div className={styles.wrapper}>
            <header className={styles.logo}>
                <Logo width="100%" height={43} />
            </header>
            <section className={styles.container}>
                <h3 className={styles.title}>
                    Sign up for an account
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <TextField
                        label="Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "username is required"
                            }
                        })}
                        error={errors.email?.message}
                    />
                    <TextField
                        label="Password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "password is required"
                            }
                        })}
                        error={errors.password?.message}
                    />
                    <TextField
                        label="Name"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "name is required"
                            }
                        })}
                        error={errors.name?.message}
                    />
                    <TextField
                        label="Phone number"
                        {...register("phoneNumber", {
                            required: {
                                value: true,
                                message: "Phone number is required"
                            }
                        })}
                        error={errors.phoneNumber?.message}
                    />
                    <div className={styles.control}>
                        <div className={styles.accept}>
                            <input
                                type="checkbox"
                                id={styles.accept}
                                onChange={() => setIsAccept(prev => !prev)}
                            />
                            <label htmlFor={styles.accept}>
                                I agree with <Link to="/contract-lience" className={styles.link}>Terms & Conditions</Link> and have understood <Link to='/policy' className={styles.link}>Privacy Policy</Link>
                            </label>
                        </div>
                    </div>
                    <div className={styles.submit}>
                        <Button
                            solid
                            primary
                            large
                            fullWidth
                            disable={!isAccept || loading}
                        >
                            Signup
                        </Button>
                        {error ? <p className={styles.errorMess}>{error}</p> : null}

                    </div>
                    <span className={styles.miniText}>Or</span>
                    <Button solid large fullWidth leftIcon={<FacebookIcon color="primary" fontSize='inherit' />}>
                        Continue with Facebook
                    </Button>
                    <div className={styles.signin}>
                        <span>Already have an account?<Link to="/login" className={styles.link}>Log in</Link></span>
                    </div>
                </form>
            </section>
            <div className={styles.bottomBackground}>
                <div className={styles.leftBackground}>
                    <LeftBackGround width={"100%"} />
                </div>
                <div className={styles.rightBackground}>
                    <RightBackGround width={"100%"} />
                </div>
            </div>
        </div>
    )
}

export default Register

