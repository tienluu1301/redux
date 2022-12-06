import Grid from '@mui/material/Unstable_Grid2';

import useTimer from '../../hooks/useTimer';
import styles from './UnderDevelopment.module.scss'

const UnderDevelopment = () => {
    const { days, hours, minutes, seconds } = useTimer(new Date('2023-03-1'))
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h2>Comming Soon</h2>
                <p>Our Page is under construction</p>
            </div>
            <div className={styles.timer}>
                <Grid container spacing={{ xs: 1, md: 4 }}>
                    <Grid xs={3}>
                        <div className={styles.card}>
                            <p>{days}</p>
                            days
                        </div>
                    </Grid>
                    <Grid xs={3}>
                        <div className={styles.card}>
                            <p>{hours}</p>
                            hours
                        </div>
                    </Grid>
                    <Grid xs={3}>
                        <div className={styles.card}>
                            <p>{minutes}</p>
                            minutes
                        </div>
                    </Grid>
                    <Grid xs={3}>
                        <div className={styles.card}>
                            <p>{seconds}</p>
                            seconds
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default UnderDevelopment