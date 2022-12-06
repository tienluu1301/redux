import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import styles from './Button.module.scss'
import classnames from 'classnames/bind'
import React from 'react'
const cx = classnames.bind(styles)

const Button = ({
    href,
    to,
    disable,
    children,
    className,
    primary,
    fullWidth,
    large,
    small,
    solid,
    outline,
    round,
    rightIcon,
    leftIcon,
    ...passProps }) => {

    let RootType = 'button'

    if (href) {
        RootType = 'a'
        passProps.href = href
    }

    if (to) {
        RootType = Link
        passProps.to = to
    }

    // có prop disable thì loại bỏ tất cả các event trên button
    if (disable) {
        Object.keys(passProps).forEach(prop => {
            if (prop.startsWith('on')) {
                delete passProps[prop]
            }
        })
    }


    const customClass = cx('wrapper', {
        [className]: className,
        primary,
        small,
        large,
        fullWidth,
        solid,
        outline,
        round,
        disable
    })

    return (
        <RootType {...passProps} className={customClass}>
            {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
            <span className={styles.ripple}></span>
        </RootType>
    )
}

Button.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    disable: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    primary: PropTypes.bool,
    fullWidth: PropTypes.bool,
    large: PropTypes.bool,
    small: PropTypes.bool,
    solid: PropTypes.bool,
    outline: PropTypes.bool,
    round: PropTypes.bool,
    rightIcon: PropTypes.node,
    leftIcon: PropTypes.node
};

export default Button