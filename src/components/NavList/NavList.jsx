import { Fragment } from 'react'
import classnames from 'classnames/bind'
import styles from './NavList.module.scss'
const cx = classnames.bind(styles)


const NavList = ({ data = [] }) => {
    return (
        <ul className={cx("wrapper")}>
            {data.map((item, index) => (
                <Fragment key={index}>
                    {/* {item.group?} */}

                    {item.seperate ?
                        <div className={cx("divider")}></div> :
                        null
                    }
                </Fragment>
            ))}
        </ul>
    )
}

export default NavList