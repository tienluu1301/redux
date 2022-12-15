import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import TextField from '../../../components/TextField'
import Button from '../../../components/Button/Button'
import MyCkEditor from '../../../components/MyCkEditor/MyCkEditor'
import MenuSelect from '../../../components/MenuSelect'
import anothersAPI from '../../../services/anothersAPI'

import useClickOutside from '../../../hooks/useClickOutsside'

import classnames from 'classnames/bind'
import styles from './ProjectForm.module.scss'
const cx = classnames.bind(styles)

const ProjectForm = ({ onSubmit }) => {
    const [open, setOpen] = useState(false)
    const { handleSubmit, register, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            alias: "",
            projectName: "",
        }
    })

    const handleOpenForm = () => {
        setOpen(true)
    }

    const handleCloseForm = (e) => {
        e.preventDefault()
        setOpen(false)
    }

    // Dùng để lưu lại editor instance sau khi editor được khởi tạo
    const editorRef = useRef()
    const selectRef = useRef()

    const formMethod = {
        reset: (...params) => {
            reset(...params)
            editorRef.current.setData('')
            selectRef.current.setValue()
        },
        closeForm: handleCloseForm
    }

    const handleOnSubmit = async (values) => {
        onSubmit({
            ...values,
            description: editorRef.current.getData(),
            categoryId: selectRef.current.getValue()?.id
        }, formMethod)
    }

    console.log("form render")

    return (
        <>
            <div className={cx('controlBtn')} onClick={handleOpenForm}>
                <Button solid primary>Create project</Button>
            </div>
            <div className={cx('wrapper', { open })} >
                <div className={cx("title")}>
                    <h2>Create Project</h2>
                </div>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className={cx('container')}>
                        <TextField
                            label="Project Name"
                            variant="trello"
                            {...register("projectName", { required: true })}
                            error={errors.projectName ? "Project Name is required" : null}
                        />
                        <TextField
                            label="Alias Name"
                            variant="trello"
                            {...register("alias", { required: true })}
                            error={errors.alias ? "Alias Name is required" : null}
                        />
                        <MenuSelect
                            serviceAPI={anothersAPI.getProjectCategories}
                            getItemsKey={(item) => item.id}
                            getSearchKey={item => item.projectCategoryName}
                            renderItem={item => (
                                <div className={cx('categoryItem')}>
                                    {item.projectCategoryName || item.name}
                                </div>
                            )}
                            arrow
                            label='Category'
                            selectPlaceHolder={<div className={cx('categoryItem')}>Select Category</div>}
                            ref={selectRef}
                        />
                        <MyCkEditor
                            label='Description'
                            editorRef={editorRef}
                        />
                        <div className={cx('formControl')}>
                            <Button solid primary className={cx('submitBtn')}>Create</Button>
                            <Button solid className={cx('submitBtn')} onClick={handleCloseForm}>Cancel</Button>
                        </div>
                    </div>
                </form>
                <button className={cx('closeBtn')} onClick={handleCloseForm}>X</button>
            </div>
            <div className={cx("overlay", { open })} onClick={handleCloseForm}></div>
        </>
    )
}

export default ProjectForm