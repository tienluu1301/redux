import React from 'react'
import Button from '../../components/Button'
import styles from './Entry.module.scss'

const Entry = () => {
    return (
        <div className={styles.wrapper}>
            <h1>WELCOME</h1>
            <h3>Thanks you for visiting my Jira Clone Application</h3>
            <p>If you like, please give me a start</p>
            <Button solid large to='/jira'>Go to Jira App</Button>
        </div>
    )
}

export default Entry