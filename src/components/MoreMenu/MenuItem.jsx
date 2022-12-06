import PropTypes from 'prop-types';
import classnames from 'classnames/bind'
import styles from './Menu.module.scss'

import Button from '../Button/Button'
// import Divider from '../Divider/Divider'

const cx = classnames.bind(styles)

const MenuItem = ({ item = {}, onClick }) => {
    const customClass = cx("item")

    return (
        <>
            {/* {item.seperate && <Divider />} */}
            <Button
                fullWidth
                className={customClass}
                leftIcon={item.icon}
                to={item.to}
                onClick={onClick}
            >
                {item.title}
            </Button>
        </>
    )
}
MenuItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func
}

export default MenuItem