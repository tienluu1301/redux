import PropTypes from 'prop-types';
import ModalMUI from '@mui/material/Modal';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styles from './Modal.module.scss'


const Modal = ({ open, onClose, title, footer, children }) => {
    return (
        <ModalMUI
            open={open}
            onClose={onClose}
        >
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <h3>{title}</h3>
                    <button
                        onClick={onClose}
                        className={styles.closeBtn}
                    >
                        <CloseOutlinedIcon fontSize='inherit' color='inherit' />
                    </button>
                </header>
                <div className={styles.body}>
                    {children}
                </div>
                <div className={styles.footer}>
                    {footer}
                </div>
            </div>
        </ModalMUI>
    );
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    footer: PropTypes.node,
    children: PropTypes.node
}

export default Modal