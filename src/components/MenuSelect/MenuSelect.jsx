import { forwardRef, useImperativeHandle, useState, useEffect } from 'react'

import Tippy from '@tippyjs/react/headless';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Popper from '../Popper';

import useRequest from '../../hooks/useRequest'
import useUpdateValue from '../../hooks/useUpdateValue'

import styles from './MenuSelect.module.scss'
import classnames from 'classnames/bind';
const cx = classnames.bind(styles)

const MenuSelect = forwardRef(({
    trigger = 'click',
    placement = 'bottom',
    items = [],
    maxRender,
    stepRender = 5,
    value,
    renderItem = (item) => item,
    getItemsKey = (item) => item,
    onChange = () => { },
    onBlur = () => { },
    getSearchKey = (item) => item,
    searchPlaceholder = 'Search',
    selectPlaceHolder,
    defaultPlaceHolder,
    label,
    rootClass,
    arrow,
    serviceAPI,
    hideOnSelect = true
},
    ref
) => {
    let options = items
    const API = useRequest(serviceAPI, { manual: true })
    const [visible, setVisible] = useState(false)
    const [maximum, setMaximum] = useState(maxRender)
    const [searchInput, setSearchInput] = useState("")
    const [selectedItem, setSelectedItem] = useUpdateValue(value)

    if (API.data) {
        options = API.data
    }

    let filterItem = options

    if (searchInput) {
        filterItem = options.filter(item => {
            return getSearchKey(item)
                .toLowerCase()
                .includes(searchInput.toLocaleLowerCase())
        })
    }

    let leftItems
    if (maximum && maximum < filterItem.length) {
        leftItems = filterItem.length - maximum
        filterItem = filterItem.slice(0, maximum)
    }

    const selectMethod = {
        setValue: (value) => {
            setSelectedItem(value)
        },
        getValue: () => {
            return selectedItem
        },
        toggleSelect: (boolean) => {
            setVisible(prev => boolean ?? !prev)
        },
        stateSelect: !visible
    }

    const handleSelect = (item) => {
        setTimeout(() => {
            // giúp cho method getValue luôn lấy được giá trị mới nhất khi dùng với ref
            onChange(item, selectMethod)
        }, 0)
        if (!hideOnSelect) return
        setVisible(false)
        setSelectedItem(item)
    }

    const handleLoadMore = () => {
        setMaximum(prev => prev + stepRender)
    }

    // Trả ra các phương thức getValue, setValue khi dùng ref
    useImperativeHandle(ref, () => {
        return selectMethod
    })

    useEffect(() => {
        if (!serviceAPI) return
        if (options.length > 0) return

        API.run()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log("render Menu")
    return (
        <div className={cx('tippyWrapper')}>
            {label ? <label htmlFor="">{label}</label> : null}
            <Tippy
                visible={visible}
                interactive
                placement={placement}
                delay={[null, 200]}
                onClickOutside={() => {
                    setVisible(false)
                    setMaximum(maxRender)
                    setSearchInput("")
                }}
                render={attrs => (
                    <div
                        className={cx("wrapper")}
                        tabIndex="-1" {...attrs}

                    >
                        <Popper>
                            <div className={cx('search')}>
                                <input
                                    type="text"
                                    value={searchInput}
                                    placeholder={searchPlaceholder}
                                    onChange={(evt) => setSearchInput(evt.target.value)}
                                />
                            </div>
                            <div className={cx('list')}>
                                {API.loading ? "Loading" : null}
                                <div className={cx('listWrapper')}>
                                    {filterItem.length > 0 ?
                                        filterItem.map((item, index) => (
                                            <div
                                                key={getItemsKey(item) || index}
                                                className={cx('itemWrapper')}
                                                onClick={() => handleSelect(item)}
                                            >
                                                {renderItem(item)}
                                            </div>
                                        )) :
                                        <div className={cx('noItem')}>
                                            No results
                                        </div>
                                    }
                                </div>
                                {leftItems > 0 ?
                                    <div className={cx('loadMoreBtn')} onClick={handleLoadMore}>
                                        Load more
                                    </div> : null
                                }
                            </div>
                        </Popper>
                    </div>
                )}
            >
                <div
                    className={cx('titleWrapper', {
                        selecting: visible,
                        [rootClass]: rootClass
                    })}
                    onClick={() => setVisible(true)}
                >
                    <div className={cx('title')}>
                        {defaultPlaceHolder ?
                            defaultPlaceHolder :
                            selectedItem ?
                                renderItem(selectedItem) :
                                selectPlaceHolder
                        }
                    </div>
                    {arrow ?
                        <div className={cx('titleIcon')}>
                            <ExpandMoreIcon color='inherit' fontSize='inherit' />
                        </div> : null
                    }

                </div>
            </Tippy>
        </div>
    )
})

export default MenuSelect