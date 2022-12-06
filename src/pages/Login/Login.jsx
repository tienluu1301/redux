import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import FacebookIcon from '@mui/icons-material/Facebook';

import { LeftBackGround, Logo, RightBackGround } from '../../components/SVG'
import Button from '../../components/Button'
import TextField from '../../components/TextField'

import { login } from '../../redux/slices/authSlice'

import styles from './Login.module.scss'

const Login = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const dispatch = useDispatch()
    const { user, loading, error } = useSelector((state) => state.auth)
    const location = useLocation()

    useEffect(() => {
        const registerInfo = location.state
        if (!registerInfo) return
        setValue("email", registerInfo.email)
        setValue("password", registerInfo.password)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = async (values) => {
        dispatch(login(values)).unwrap()
            .then(() => {
                toast.success("Login successfully!")
            })
            .catch(() => {
                toast.error(error)
            })
    }

    if (user) {
        return <Navigate to='/jira' />
    }

    return (
        <div className={styles.wrapper}>
            <header className={styles.logo}>
                <Logo width="100%" height={43} />
            </header>
            <section className={styles.container}>
                <h3 className={styles.title}>
                    Login to Jira
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <TextField
                        label="Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            }
                        })}
                        error={errors.email?.message}
                    />
                    <TextField
                        label="Password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required"
                            }
                        })}
                        error={errors.password?.message}
                    />
                    <div className={styles.control}>
                        <div className={styles.remember}>
                            <input type="checkbox" name="" id={styles.remember} checked readOnly />
                            <label htmlFor={styles.remember}>Remember me</label>
                        </div>
                        <Link to="/forgot-password" className={styles.link}>Forgot Password?</Link>
                    </div>
                    <div className={styles.submit}>
                        <Button
                            solid
                            primary
                            large
                            fullWidth
                            disable={loading}
                        >
                            Log in
                        </Button>
                        {error ? <p className={styles.errorMess}>{error}</p> : null}
                    </div>
                    <span className={styles.miniText}>Or</span>
                    <Button solid large fullWidth leftIcon={<FacebookIcon color="primary" fontSize='inherit' />}>Continue with Facebook</Button>
                    <div className={styles.signup}>
                        <span>Can't log in?<Link to="/register" className={styles.link}>Sign up for an account</Link></span>
                    </div>
                </form>
            </section>
            {/* <Button solid small primary className={styles.clickMe}>Click me!!!!</Button> */}
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

export default Login