import PropTypes from 'prop-types';
import { forwardRef } from 'react'
import styles from './TextField.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)

const TextField = forwardRef(({ type = "text", label, onChange, className, error, ...passProp }, ref) => {
    let Component = "input"
    if (type === 'textarea') {
        Component = 'textarea'
        type = null
    }
    return (
        <div className={cx(
            "wrapper",
            { [className]: className }
        )}>
            <Component
                className={styles.input}
                type={type}
                placeholder="_"
                onChange={onChange}
                {...passProp}
                ref={ref}
            />
            {label && <label>{label}</label>}
            {error && <p className={styles.errorMess}>{error}</p>}
        </div>
    )
})

TextField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
}

export default TextField