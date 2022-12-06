import React from 'react'
import Button from '../../components/Button'
import styles from './Entry.module.scss'

const Entry = () => {
    return (
        <div className={styles.wrapper}>
            <h1>WELCOME</h1>
            <h3>Thanks you for visiting my Jira Clone Application</h3>
            <p>To access, please login</p>
            <Button solid large to='/login'>Go to Login</Button>
        </div>
    )
}

export default Entry