import { useState, useImperativeHandle, forwardRef } from 'react'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import LinearProgress from '@mui/material/LinearProgress';

import classNames from 'classnames/bind';
import styles from './TimeTracking.module.scss'
import useUpdateValue from '../../../hooks/useUpdateValue';
const cx = classNames.bind(styles)

const TimeTracking = forwardRef(({ timeSpend = 0, timeRemain = 0, label }, ref) => {
    const [timeSpending, setTimeSpending] = useUpdateValue(timeSpend)
    const [timeRemaining, setTimeRemaining] = useUpdateValue(timeRemain)
    const progress = 100 * Number(timeSpending) / (Number(timeSpending) + Number(timeRemaining))

    const timeTrackingMethod = {
        setTimeSpending,
        setTimeRemaining
    }
    useImperativeHandle(ref, () => timeTrackingMethod)
    return (
        <div className={cx('timeTrackingWrapper')}>
            {label ? <label htmlFor="">Time Tracking</label> : null}
            <div className={cx('timeTracking')}>
                <TimerOutlinedIcon className={cx('clockIcon')} />
                <div className={cx('progress')}>
                    <LinearProgress variant="determinate" value={progress} />
                    <div className={cx('progressInfo')}>
                        <span>{timeSpending}h logged</span>
                        <span>{timeRemaining}h remaining</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default TimeTracking