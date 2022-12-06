import React from 'react'
import { Outlet } from 'react-router-dom'
import classnames from 'classnames/bind'


import styles from './DefaultLayout.module.scss'
// import Breadcrumbs from '../../components/Breadcrumbs'
import Header from '../components/Header/Header'
const cx = classnames.bind(styles)

const DefaultLayout = () => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Outlet />
            {/* <div className={cx('left')}>
                <Navbar />
            </div>
            <div className={cx('right')}>
                <div className={cx('rightTop')}>
                    <Breadcrumbs />
                </div>
                <div className={cx('content')}>
                    <Outlet />
                </div>
            </div> */}
        </div>
    )
}

export default DefaultLayout  