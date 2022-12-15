import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CustomNoRowsOverlay from '../TableData/CustomNoRowsOverlay'
import CustomLoadingOverlay from '../TableData/CustomLoadingOverlay'

const CustomSelect = styled(FormControl)`
    border-radius:6px;
    border-color: var(--border-color) !important;

    & *{
        font-size: 1.6rem;
    }

    & .MuiSelect-select {
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        color: var(--heading-color);
    }

    & .MuiInputLabel-root {
        color: var(--text-color);
        font-family: inherit;
        font-size: 1.6rem;
        top: calc(50% - 20px);
        transform: translate(0px, 8px) scale(1);
        left: 20px;

        &.Mui-focused{
            transform: translate(0px, -10px) scale(1);
            font-size: 1.4rem;
            color: var(--primary-color);
        }

        &.MuiFormLabel-filled  {
            font-size: 1.4rem;
            transform: translate(0px, -10px) scale(1);
        }

    }

    & .MuiInputBase-root {
        height: 40px;
        &:hover {
            border:none!important;
            border-color: var(--border-color) !important;
            background-color: var(--input-bg-hover-color);
            outline:none;


            .MuiOutlinedInput-notchedOutline {
                border: var(--border-color);
            }
        }

        &.Mui-focused {

            & .MuiOutlinedInput-notchedOutline {
                border-color: var(--border-color);
                border-width: 3px;
            }
        }

        legend
    }

    & .MuiOutlinedInput-notchedOutline {
        padding:0 12px;
        border-color: var(--border-color);
    }

    .errorMess {
        position:absolute;
        top: 100%;
        color: var(--error-color);
        font-size: 1.2rem;
        margin: 4px 0 0 16px;
    }

`

const CustomMenuItem = styled(MenuItem)`
    font-size: 1.4rem;
`

const StyledSelect = ({
    options = [],
    label,
    formRegister,
    error,
    defaultValue = '',
    loading
}) => {

    return (
        <CustomSelect fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                inputProps={formRegister}
                label={label}
                defaultValue={defaultValue}
            >
                {loading ?
                    <CustomLoadingOverlay /> :
                    options.length === 0 ?
                        <CustomNoRowsOverlay /> :
                        options.map(option => (
                            <CustomMenuItem value={option.value} key={option.value}>
                                {option.label}
                            </CustomMenuItem>
                        ))}
            </Select>
            {error && <p className='errorMess'>{error}</p>}
        </CustomSelect>
    );
}

StyledSelect.propTypes = {
    options: PropTypes.array,
    label: PropTypes.string,
    formRegister: PropTypes.object,
    error: PropTypes.any,
    defaultValue: PropTypes.any,
    loading: PropTypes.bool
}

export default StyledSelect