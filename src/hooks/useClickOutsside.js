import { useEffect } from "react"
export default function useClickOutside(ref, cb) {

    useEffect(() => {
        const handler = (e) => {
            if (ref.current == null || ref.current.contains(e.target)) return
            cb(e)
        }
        document.addEventListener('click', handler)

        return () => {
            document.removeEventListener('click', handler)
        }
    }, [])
}