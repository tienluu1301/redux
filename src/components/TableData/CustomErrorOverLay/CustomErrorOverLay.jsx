import styles from './CustomErrorOverLay.module.scss'

const CustomErrorOverLay = () => {
    return (
        <div className={styles.wrapper}>
            <h3>Oops... Something went error</h3>
            <p>please try again</p>
        </div >
    )
}

export default CustomErrorOverLay