import './styles.scss'
import { ToastContainer } from 'react-toastify'


import "react-toastify/dist/ReactToastify.css"
import 'tippy.js/dist/tippy.css'

const GlobalStyles = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer
                autoClose={2000}
                pauseOnHover={false}
            />
        </>
    )
}

export default GlobalStyles