import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import classnames from 'classnames/bind'

import Tippy from '@tippyjs/react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';

import SubNavbar from '../SubNavbar'
import { Avatar } from '../../../components/Avatar'
import { JiraLogoWhite } from '../../../components/SVG'
import { useSelector } from 'react-redux'
const cx = classnames.bind(styles)

const Navbar = () => {
    const { user } = useSelector(state => state.auth)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('mainNav')}>
                <Link to='/jira' className={cx('logo')}>
                    <JiraLogoWhite width='100%' height='100%' />
                </Link>
                <ul className={cx('mainNavList')}>
                    <li className={cx('mainNavItem')}>
                        <Tippy content='Search issues' placement='right-end'>
                            <button>
                                <SearchOutlinedIcon fontSize='inherit' color='inherit' />
                            </button>
                        </Tippy>
                    </li>
                    <li className={cx('mainNavItem')}>
                        <Tippy content='Create issues' placement='right'>
                            <button>
                                <AddOutlinedIcon fontSize='inherit' color='inherit' />
                            </button>
                        </Tippy>
                    </li>
                </ul>
                <ul className={cx('mainNavList', 'bottom')}>
                    <li className={cx('mainNavItem')}>
                        <Tippy content={user?.name || 'anonymous'} placement='right-end'>
                            <button>
                                <Avatar src={user?.avatar} status='online' variant='circle' />
                            </button>
                        </Tippy>
                    </li>
                    <li className={cx('mainNavItem')}>
                        <Tippy content='About' placement='right'>
                            <button>
                                <ContactSupportOutlinedIcon fontSize='inherit' color='inherit' />
                            </button>
                        </Tippy>
                    </li>
                </ul>
            </div>
            <SubNavbar />
        </div>
    )
}

export default Navbar