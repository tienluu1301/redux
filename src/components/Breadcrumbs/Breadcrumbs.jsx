import { Fragment } from 'react'
import { useHref, NavLink } from 'react-router-dom'
import classnames from 'classnames/bind'
import styles from './Breadcrumbs.module.scss'

const cx = classnames.bind(styles)
const Breadcrumbs = () => {
    const href = useHref()

    const breadcrums = []
    let string = ''
    decodeURI(href).split('/').slice(1).forEach(item => {
        string += '/' + encodeURI(item)
        breadcrums.push({
            path: string,
            name: item
        })
    })

    return (
        <div className={cx('wrapper')}>
            {breadcrums.map((location, index) => (
                <Fragment key={index}>
                    <NavLink
                        to={location.path}
                        key={index}
                        className={cx('link', {
                            'active': index === breadcrums.length - 1
                        })}
                    >
                        {location.name.replaceAll("-", " ")}
                    </NavLink>
                    {index !== breadcrums.length - 1 ?
                        <span className={cx('slash')}>/</span> :
                        null
                    }
                </Fragment>
            ))}
        </div>
    )
}

export default Breadcrumbs