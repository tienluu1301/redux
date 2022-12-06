import PropTypes from 'prop-types';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

import styles from './Menu.module.scss'


const MenuHeader = ({ title, onBack }) => {
    return (
        <div className={styles.title}>
            <div className={styles.icon} onClick={onBack}>
                <ArrowBackIosNewOutlinedIcon />
            </div>
            <h3>{title}</h3>
        </div>
    )
}

MenuHeader.propTypes = {
    title: PropTypes.string,
    onBack: PropTypes.func
}

export default MenuHeader