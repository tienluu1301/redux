import React from 'react'
import classnames from 'classnames/bind'
import { NavLink } from 'react-router-dom'

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import { JiraLogo } from '../../../components/SVG'
import Button from '../../../components/Button'
import MoreMenu from '../../../components/MoreMenu'

import styles from './Header.module.scss'
import { GitHub } from '@mui/icons-material';
import { Avatar } from '../../../components/Avatar';
import { useSelector } from 'react-redux';
const cx = classnames.bind(styles)

const Header = () => {
    const { user } = useSelector(state => state.auth)

    const menu = [
        { title: "Profile", action: "get-profile" },
        { title: "Setting" },
        { title: "Logout", action: 'logout', seperate: true },
    ]
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <JiraLogo width={20} height={20} />
                <h1>
                    Jira Software
                </h1>
            </div>
            <div className={cx('navigation')}>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <NavLink to='/jira/my-works' className={({ isActive }) => cx('link', { active: isActive })}>My Works</NavLink>
                    </li>
                    <li className={cx('item')}>
                        <NavLink to='/jira/projects' className={({ isActive }) => cx('link', { active: isActive })}>Projects</NavLink>
                    </li>
                    <li className={cx('item')}>
                        <NavLink to='/jira/users' className={({ isActive }) => cx('link', { active: isActive })}>Users</NavLink>
                    </li>
                </ul>
            </div>
            <div className={cx('right')}>
                <Button solid leftIcon={<GitHub />} >
                    Github Repo
                </Button>
                <MoreMenu items={menu}>
                    <div className={cx('avatarWrapper')}>
                        <Avatar src={user?.avatar} variant='circle' />
                    </div>
                </MoreMenu>
            </div>
        </div>
    )
}

export default Header