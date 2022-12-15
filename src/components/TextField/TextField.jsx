import PropTypes from 'prop-types';
import { forwardRef, useId, useEffect, useRef } from 'react'
import styles from './TextField.module.scss'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)

const TextField = forwardRef(({
    type = "text",
    variant = "mui",
    label,
    onChange,
    className,
    inputClass,
    autoHeight,
    error,
    readOnly = false,
    disabled = false,
    ...passProp
}, ref) => {

    const id = useId();
    const myRef = useRef()
    let Component = "input"
    if (type === 'textarea') {
        Component = 'textarea'
        type = null
    }

    useEffect(() => {
        if (!autoHeight) return
        // Xử lý textarea có thể autoheight mà không bị scroll dọc
        myRef.current.addEventListener('input', autoResize);

        function autoResize() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }

        return () => {
            // myRef.current.removeEventListener('input', autoResize)
        }
    }, [])

    return (
        <div className={cx(
            "wrapper",
            {
                [className]: className,
                readOnly,
                [variant]: variant,
                disabled
            }
        )}>
            <Component
                className={cx('input', {
                    [inputClass]: inputClass
                })}
                type={type}
                placeholder={variant === "MUI" ? "_" : null}
                onChange={onChange}
                readOnly={readOnly}
                disabled={disabled}
                {...passProp}
                ref={(node) => {
                    myRef.current = node;
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }
                }}
                id={id}
            />
            {label && <label htmlFor={id}>{label}</label>}
            {error &&
                <p className={styles.errorMess}>
                    <ReportProblemIcon fontSize='inherit' color='inherit' />
                    {error}
                </p>}
        </div>
    )
})

TextField.propTypes = {
    type: PropTypes.string,
    variant: PropTypes.oneOf(["mui", "trello"]),
    label: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    autoHeight: PropTypes.bool,
    className: PropTypes.string,
    inputClass: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export default TextField