import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames/bind'

import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

import styles from './SubNavbar.module.scss'
import { ProjectLogo } from '../../../components/SVG'

import useToggle from '../../../hooks/useToggle'

import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';

const cx = classnames.bind(styles)

const SubNavbar = () => {
    const { selectedProject } = useSelector(state => state.project)
    const { projectId } = useParams()
    const [expand, toggleExpand] = useToggle(() => {
        if (window.innerWidth < 768) {
            return false
        }
        return true
    })

    return (
        <div className={cx('wrapper', { expand })}>
            <div className={cx('contentWrapper')}>
                <div className={cx('content')}>
                    <div className={cx('projectInfo')}>
                        <div className={cx('projectImg')}>
                            <ProjectLogo width='100%' height='100%' />
                        </div>
                        <div className={cx('projectName')}>
                            <h2>{selectedProject?.projectName || "singularity 1.0"}</h2>
                            <p>{selectedProject?.projectCategory.name || "Software project"}</p>
                        </div>
                    </div>
                    <div className={cx('navigation')}>
                        <ul className={cx('list')}>
                            <li className={cx("item")}>
                                <NavLink to={`/jira/projects/${projectId}/kanban-board`} className={({ isActive }) => cx('link', { active: isActive })} end>
                                    <div className={cx('icon')}>
                                        <ViewKanbanOutlinedIcon fontSize='inherit' color='inherit' />
                                    </div>
                                    <span>Kanban Board</span>
                                </NavLink>
                            </li>
                            <li className={cx("item")}>
                                <NavLink to={`/jira/projects/${projectId}/project-setting`} className={({ isActive }) => cx('link', { active: isActive })} end>
                                    <div className={cx('icon')}>
                                        <SettingsOutlinedIcon fontSize='inherit' color='inherit' />
                                    </div>
                                    <span>Project setting</span>
                                </NavLink>
                            </li>
                        </ul>
                        <div className={cx("divider")}></div>
                        <ul className={cx('list')}>
                            <li className={cx("item")}>
                                <NavLink to={`/jira/projects/${projectId}/Releases`} className={({ isActive }) => cx('link', { active: isActive })} end>
                                    <div className={cx('icon')}>
                                        <LocalShippingOutlinedIcon fontSize='inherit' color='inherit' />
                                    </div>
                                    <span>Releases</span>
                                </NavLink>
                            </li>
                            <li className={cx("item")}>
                                <NavLink to={`/jira/projects/${projectId}/Issues`} className={({ isActive }) => cx('link', { active: isActive })} end>
                                    <div className={cx('icon')}>
                                        <FilterNoneOutlinedIcon fontSize='inherit' color='inherit' />
                                    </div>
                                    <span>Issues and filters</span>
                                </NavLink>
                            </li>
                            <li className={cx("item")}>
                                <NavLink to={`/jira/projects/${projectId}/Pages`} className={({ isActive }) => cx('link', { active: isActive })} end>
                                    <div className={cx('icon')}>
                                        <ArticleOutlinedIcon fontSize='inherit' color='inherit' />
                                    </div>
                                    <span>Pages</span>
                                </NavLink>
                            </li>
                            <li className={cx("item")}>
                                <NavLink to={`/jira/projects/${projectId}/Reports`} className={({ isActive }) => cx('link', { active: isActive })} end>
                                    <div className={cx('icon')}>
                                        <TrendingUpOutlinedIcon fontSize='inherit' color='inherit' />
                                    </div>
                                    <span>Reports</span>
                                </NavLink>
                            </li>
                            <li className={cx("item")}>
                                <NavLink to={`/jira/projects/${projectId}/Components`} className={({ isActive }) => cx('link', { active: isActive })} end>
                                    <div className={cx('icon')}>
                                        <FolderZipOutlinedIcon fontSize='inherit' color='inherit' />
                                    </div>
                                    <span>Components</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={cx('resizeControl')}>
                <div className={cx('toggleBtn')} onClick={toggleExpand}>
                    <ChevronLeftOutlinedIcon color='inherit' fontSize='inherit' />
                </div>
                <div className={cx('boundaryLine')}></div>
            </div>
        </div>
    )
}

export default SubNavbar