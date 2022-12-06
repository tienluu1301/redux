import PropTypes from 'prop-types';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss'
const cx = classNames.bind(styles)

const SearchBar = ({
    loading,
    onChange = () => { },
    onClearValue = () => { },
    onSubmit = () => { },
    value = "",
    placeholder = "Search here",
    outline
}) => {
    return (
        <div className={cx("searchBar", { outline })}>
            <input
                type="text"
                value={value}
                className={cx("searchInput")}
                placeholder={placeholder}
                onChange={onChange}
            />
            {loading ?
                <SyncIcon
                    className={cx("icon")}
                    fontSize="inherit"
                /> :
                value ?
                    <ClearOutlinedIcon
                        className={cx("icon")}
                        fontSize="inherit"
                        onClick={onClearValue}
                    /> : ""
            }

            <button
                className={cx("submit")}
                onClick={() => onSubmit(value)}
            >
                <SearchOutlinedIcon fontSize="inherit" />
            </button>
        </div>
    )
}


SearchBar.propTypes = {
    outline: PropTypes.bool,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    onClearValue: PropTypes.func,
    onSubmit: PropTypes.func
}
export default SearchBar