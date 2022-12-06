import PropTypes from 'prop-types';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss'
import Popper from '../Popper/Popper';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

const MoreMenu = ({ children, items = [], onChange = () => { }, placement = 'bottom' }) => {
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
            trigger='click'
            placement={placement}
            delay={[null, 200]}
            onHide={handleReset}
            render={attrs => (
                <div className={styles.wrapper} tabIndex="-1" {...attrs}>
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
        >
            <div className={styles.menu}>
                {children}
            </div>
        </Tippy>
    )
}

MoreMenu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,
    placement: PropTypes.string,
    onChange: PropTypes.func
}

export default MoreMenu