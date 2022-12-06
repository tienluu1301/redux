import PropTypes from 'prop-types';
import { memo } from 'react'
import classnames from 'classnames/bind'
import styles from './Tree.module.scss'

import TreeItem from './TreeItem'
const cx = classnames.bind(styles)

const TreeView = ({ data = [], indicator = true, children }) => {

    return (
        <ul className={cx("list")} >
            {data.map((node, index) => (
                <TreeItem node={node} key={index} indicator={indicator} />
            ))}
            {children}
        </ul>
    )
}

TreeView.propTypes = {
    data: PropTypes.array.isRequired,
    children: PropTypes.node,
    indicator: PropTypes.bool
}

export default memo(TreeView)