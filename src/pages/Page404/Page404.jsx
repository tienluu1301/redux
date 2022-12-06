import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import styles from './Page404.module.scss'
import astronaut from '../../assets/images/astronaut.png'

const Page404 = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.wrapper}>
            <h2>404</h2>
            <h3>Page not found.</h3>
            <p>The page you are looking for might have been removed.</p>
            <Button
                solid primary large
                onClick={() => navigate(-1)}
            >
                Go Back
            </Button>
            <img src={astronaut} alt="" />
        </div>
    )
}

export default Page404