import PropTypes from 'prop-types';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss'
import classNames from 'classnames/bind';
import Popper from '../Popper/Popper';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

const cx = classNames.bind(classNames)

const MoreMenu = ({ children, items = [], trigger = 'click', onChange = () => { }, placement = 'bottom', rootClass = '', rootActiveClass = '', ...passProp }) => {
    const [active, setActive] = useState(false)
    const [history, sethistory] = useState([{ data: items }])
    const current = history[history.length - 1]
    const handleClick = (item) => {
        const isParent = !!item.children
        if (isParent) {
            sethistory(prev => [...prev, item.children])
        }
        else {
            onChange(item)
        }
    }

    const handleBack = () => {
        sethistory(prev => prev.slice(0, prev.length - 1))
    }

    const handleReset = () => {
        sethistory(prev => prev.slice(0, 1))
    }

    return (
        <Tippy
            interactive
            trigger={trigger}
            placement={placement}
            delay={[null, 200]}
            onHide={handleReset}
            onTrigger={() => setActive(true)}
            onHidden={() => setActive(false)}
            render={attrs => (
                <div
                    className={cx("wrapper")}
                    tabIndex="-1" {...attrs}
                    onClick={(evt) => {
                        evt.stopPropagation()
                    }}
                >
                    <Popper>
                        {history.length > 1 &&
                            <MenuHeader title={current.title} onBack={handleBack} />}
                        {current.data.map((item, index) => (
                            <MenuItem
                                key={index}
                                item={item}
                                onClick={() => handleClick(item)} />
                        ))}
                    </Popper>
                </div>
            )}
            {...passProp}
        >
            <div
                className={cx("menu", {
                    [rootClass]: rootClass,
                    [rootActiveClass]: active
                })}
                onClick={(evt) => {
                    evt.stopPropagation()
                }}
            >
                {children}
            </div>
        </Tippy>
    )
}

MoreMenu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,
    placement: PropTypes.string,
    onChange: PropTypes.func,
    rootActiveClass: PropTypes.string,
    rootClass: PropTypes.string,
    trigger: PropTypes.oneOf(["click", "focusin", "mouseenter focus", "mouseenter click", "manual"])
}

export default MoreMenu