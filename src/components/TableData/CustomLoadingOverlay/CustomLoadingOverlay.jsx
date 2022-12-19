import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import styles from './CustomLoadingOverlay.module.scss'

const CustomLoadingOverlay = ({ message = 'Data is loading ...', overlay = false }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loaderWrapper}>
                <CloudQueueOutlinedIcon fontSize='inherit' color="inherit" />
                <div className={styles.loader}>
                    <div className={styles.inner}></div>
                    <div className={styles.inner} ></div >
                    <div className={styles.inner} ></div >
                </div >
                <p>{message}</p>
            </div>
            {overlay && <div className={styles.overlay}></div>}
        </div >
    )
}

export default CustomLoadingOverlay