import { useState, useEffect } from 'react'

const useTimer = (follwingDate = new Date()) => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const CurrentDate = new Date().getTime()
        const leftTime = follwingDate.getTime() - CurrentDate
        return leftTime
    })

    let days = Math.floor(timeLeft / (1000 * 3600 * 24))
    let hours = Math.floor((timeLeft - days * 1000 * 3600 * 24) / (1000 * 3600))
    let minutes = Math.floor((timeLeft - days * 1000 * 3600 * 24 - hours * 1000 * 3600) / (1000 * 60))
    let seconds = Math.floor((timeLeft - days * 1000 * 3600 * 24 - hours * 1000 * 3600 - minutes * 1000 * 60) / (1000))

    useEffect(() => {
        if (timeLeft === 0) return
        const timeID = setTimeout(() => {
            setTimeLeft(prev => prev - 1000)
        }, 1000)

        return () => {
            clearInterval(timeID)
        }
    }, [timeLeft])
    return { days, hours, minutes, seconds }
}

export default useTimer