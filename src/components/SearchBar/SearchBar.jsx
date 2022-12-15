import PropTypes from 'prop-types';

import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import useDebounce from '../../hooks/useDebounce'

import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss'
const cx = classNames.bind(styles)

const SearchBar = forwardRef(({
    loading,
    onChange = () => { },
    onClearSearchValue = () => { },
    onSubmit = () => { },
    options = {
        debounce: false,
        onDebounce: () => { },
        time: 200
    },
    value = '',
    placeholder = "Search here",
    outline
}, ref) => {
    const [inputValue, setInputValue] = useState(value)
    const isFirstRender = useRef(true)
    console.log("searchbar render")
    const searchMethod = {
        getValue: () => inputValue,
        setValue: (value) => {
            setInputValue(value)
        }
    }
    useImperativeHandle(ref, () => searchMethod)

    const handleChange = (evt) => {
        setInputValue(evt.target.value)
        onChange(inputValue, searchMethod)
    }
    const handleResetInput = () => {
        setInputValue("")
        onClearSearchValue(inputValue, searchMethod)
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        if (!options.debounce) return
        const timeouId = setTimeout(() => {
            options.onDebounce?.(inputValue, searchMethod)
        }, options.time)

        return () => {
            clearTimeout(timeouId)
        }
    }, [inputValue])

    return (
        <div className={cx("searchBar", { outline })}>
            <input
                type="text"
                value={inputValue}
                className={cx("searchInput")}
                placeholder={placeholder}
                onChange={handleChange}
            />
            {loading ?
                <SyncIcon
                    className={cx("icon")}
                    fontSize="inherit"
                /> :
                inputValue ?
                    <ClearOutlinedIcon
                        className={cx("icon")}
                        fontSize="inherit"
                        onClick={handleResetInput}
                    /> : ""
            }
            <button
                className={cx("submit")}
                onClick={() => onSubmit(inputValue)}
            >
                <SearchOutlinedIcon fontSize="inherit" />
            </button>
        </div>
    )
})


SearchBar.propTypes = {
    outline: PropTypes.bool,
    loading: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    onClearValue: PropTypes.func,
    onSubmit: PropTypes.func
}
export default SearchBar