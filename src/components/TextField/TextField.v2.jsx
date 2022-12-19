import PropTypes from 'prop-types';
import { forwardRef, useId, useEffect, useRef, useState, useImperativeHandle } from 'react'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import useUpdateValue from '../../hooks/useUpdateValue'

import classNames from 'classnames/bind';
import styles from './TextField.module.scss'
const cx = classNames.bind(styles)

const TextField = forwardRef(({
    type = "text",
    variant = "mui",
    label,
    className,
    inputClass,
    autoHeight,
    value = '',
    error,
    readOnly = false,
    disabled = false,
    onChange = () => { },
    onBlur = () => { },
    ...passProp
}, ref) => {

    const [inputValue, setInputValue] = useUpdateValue(value)

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

        const localRef = myRef.current
        localRef.addEventListener('input', autoResize);

        function autoResize() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }

        return () => {
            localRef.removeEventListener('input', autoResize)
        }
    }, [])

    // useEffect(() => {
    //     setInputValue(value)
    // }, [value])

    const inputMethod = {
        setValue: (value) => {
            setInputValue(value)
        },
        getValue: () => {
            return inputValue
        },
        getInputNode: () => {
            return myRef.current
        }
    }
    useImperativeHandle(ref, () => inputMethod)

    const handleOnBlur = () => {
        onBlur(inputValue, inputMethod)
    }

    const handleOnChange = (evt) => {
        setInputValue(evt.target.value)
        console.log(evt.target.value)

        setTimeout(() => {
            // giúp cho method getValue luôn lấy được giá trị mới nhất
            onChange(evt.target.value, inputMethod)
        }, 0)
    }

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
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                readOnly={readOnly}
                disabled={disabled}
                value={inputValue}
                {...passProp}
                ref={myRef}
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