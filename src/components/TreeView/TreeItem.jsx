import PropTypes from 'prop-types';
import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useHref } from 'react-router-dom';
import classnames from 'classnames/bind'

import Collapse from '@mui/material/Collapse';
import styles from './Tree.module.scss'
import TreeView from './TreeView'
const cx = classnames.bind(styles)

const TreeItem = ({ node, indicator }) => {
    const href = useHref()
    const [isExpanded, setExpanded] = useState(() => node.expanded || false)
    const hasChild = node.children ? true : false

    let Component = 'li'
    const { props = {} } = node
    let componentClass = cx("item", {
        root: node.root,
        expanded: isExpanded,
        separate: node.separate,
        active: href === node.to
    })

    if (node.to) {
        Component = Link
        props.to = node.to
    }

    return (
        <Component {...props} className={componentClass}>
            <div
                className={cx("title")}
                onClick={() => setExpanded(!isExpanded)}
            >
                {node.icon && (
                    <div className={cx("iconView")}>
                        {node.icon}
                    </div>
                )}
                <span>{node.title}</span>
                {hasChild && (
                    <div className={cx("iconToggle")}>
                        <KeyboardArrowDownIcon fontSize='inherit' color='inherit' />
                    </div>
                )}
                {indicator ?
                    <div className={cx("indicator")}></div> :
                    null
                }
            </div>

            {hasChild && (
                <Collapse orientation="vertical" in={isExpanded}>
                    <TreeView data={node.children} />
                </Collapse>
            )}
        </Component>
    )
}

TreeItem.propTypes = {
    node: PropTypes.object.isRequired
}

export default TreeItem