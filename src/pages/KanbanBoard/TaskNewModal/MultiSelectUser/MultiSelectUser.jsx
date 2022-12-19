import { forwardRef, useImperativeHandle, useRef, useState } from 'react'


import MenuSelect from '../../../../components/MenuSelect'

import { Avatar } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ClearIcon from '@mui/icons-material/Clear';



import classnames from 'classnames/bind'
import styles from './MultiSelectUser.module.scss'
import { useSelector } from 'react-redux'
const cx = classnames.bind(styles)

const MultiSelectUser = forwardRef((_, ref) => {
    const { selectedProject } = useSelector(state => state.project)
    const [selectedMember, setSelectedMember] = useState([])
    const selectRef = useRef()
    const handleSelectUser = (item, selectMethod) => {
        setSelectedMember(prev => {
            if (prev.find(x => x.userId === item.userId)) return prev
            return [...prev, item]
        })
        selectMethod.toggleSelect(false)
    }

    const handleRemoveUser = (id) => {
        setSelectedMember(prev => {
            return prev.filter(item => item.userId !== id)
        })
    }

    const multiSelectMethod = {
        getValue: () => selectedMember,
        setValue: (value) => {
            setSelectedMember(value)
        }
    }

    useImperativeHandle(ref, () => multiSelectMethod)
    return (
        <MenuSelect
            ref={selectRef}
            onChange={handleSelectUser}
            defaultPlaceHolder={(
                <div className={cx('wrapper')}>
                    {selectedMember.map(item => (
                        <div className={cx('member')} key={item.userId} onClick={(evt) => evt.stopPropagation()}>
                            <Avatar src={item.avatar} sx={{ width: 24, height: 24 }} />
                            <span>{item.name}</span>
                            <button
                                className={cx('removeMemberBtn')}
                                onClick={() => handleRemoveUser(item.userId)}
                            >
                                <ClearIcon fontSize='inherit' color='inherit' />
                            </button>
                        </div>
                    ))}
                    <div className={cx('assignmentBtn')}>
                        <AddOutlinedIcon fontSize='inherit' color='inherit' />
                        <span>Add User</span>
                    </div>
                </div>
            )}
            renderItem={(item) => (
                <div className={cx('assignment', {
                    alreadySelect: selectedMember.find(member => member.userId === item.userId)
                })}>
                    <Avatar src={item.avatar} sx={{ width: 24, height: 24 }} />
                    <span>
                        {item.name}{selectedProject.creator.id === item.userId ? " 🔱 (Project owner)" : ""}
                    </span>
                </div>
            )}
            maxRender={4}
            stepRender={2}
            getSearchKey={(item) => item.name}
            getItemsKey={(item) => item.userId}
            items={selectedProject?.members || []}
            rootClass={cx('assignmentBtnWrapper')}
            label="Assigment"
        />
    )
})

export default MultiSelectUser