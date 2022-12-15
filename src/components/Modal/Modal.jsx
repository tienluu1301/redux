import PropTypes from 'prop-types';
// import ModalMUI from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import Zoom from '@mui/material/Zoom'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss'
const cx = classNames.bind(styles)


const Modal = ({ open, onClose, title, footer, children }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll="body"
        // keepMounted
        // hideBackdrop
        // closeAfterTransition
        // disableScrollLock
        >
            <DialogTitle>
                <header className={cx("header")}>
                    <h3>{title}</h3>
                    <button
                        onClick={onClose}
                        className={cx("closeBtn")}
                    >
                        <CloseOutlinedIcon fontSize='inherit' color='inherit' />
                    </button>
                </header>
            </DialogTitle>
            <DialogContent>
                <div className={cx("body")}>
                    {children}
                </div>
            </DialogContent>
            <DialogActions>
                <div className={cx("footer")}>
                    {footer}
                </div>
            </DialogActions>
        </Dialog>
    );
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    custom: PropTypes.bool,
    footer: PropTypes.node,
    children: PropTypes.node
}

export default Modal