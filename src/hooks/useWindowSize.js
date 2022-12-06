import { useState, useEffect } from 'react'

const useWindowSize = (delay) => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        let shouldWait = false
        let waitingValue = null
        const timeoutFunc = () => {
            if (waitingValue == null) {
                shouldWait = false
            } else {
                setWindowSize(waitingValue)
                waitingValue = null
                setTimeout(timeoutFunc, delay)
            }
        }

        const handleResize = () => {
            if (shouldWait) {
                waitingValue = {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
                return
            }

            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
            shouldWait = true

            setTimeout(timeoutFunc, delay)
        }

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return windowSize
}

export default useWindowSize