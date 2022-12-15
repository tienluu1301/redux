import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import classnames from 'classnames/bind'

import MoreMenu from '../../components/MoreMenu'
import TextField from '../../components/TextField'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { getProjectDetail } from '../../redux/slices/projectSlice'
import useRequest from '../../hooks/useRequest'
import anothersAPI from '../../services/anothersAPI'
import projectAPI from '../../services/projectAPI'

import styles from './ProjectSetting.module.scss'
import Button from '../../components/Button/Button'
import { toast } from 'react-toastify'
import MyCkEditor from '../../components/MyCkEditor/MyCkEditor'
import MenuSelect from '../../components/MenuSelect'

const cx = classnames.bind(styles)

const ProjectSetting = () => {
    const { selectedProject } = useSelector(state => state.project)
    const dispatch = useDispatch()

    // const getCategory = useRequest(anothersAPI.getProjectCategories)
    const updateProject = useRequest(projectAPI.updateProject, { manual: true })
    const { handleSubmit, register, formState: { errors }, setValue } = useForm({
        defaultValues: {
            creator: "",
            id: "",
            projectName: "",
            // categoryId: "",
        }
    })

    // Dùng để lưu lại editor instance sau khi editor được khởi tạo
    const editorRef = useRef()
    const selectRef = useRef()

    useEffect(() => {
        setValue('id', selectedProject?.id)
        setValue('creator', selectedProject?.creator.id)
        setValue('projectName', selectedProject?.projectName)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProject])

    const onSubmit = async (values) => {
        const updateValues = {
            ...values,
            description: editorRef.current?.getData() ||
                selectedProject?.description || ''
            ,
            categoryId: selectRef.current.getValue().id
        }

        try {
            const data = await updateProject.runAsync(values.id, updateValues)
            toast.success("Save change successful")
            dispatch(getProjectDetail(data.id))
        } catch (error) {
            toast.error(typeof error === "string" ? error : "Request denied! Something went error")
        }
    }

    console.log("setting render")

    return (
        <div className={cx('wrapper')}>
            <div className={cx("title")}>
                <h2>Detail</h2>
                <MoreMenu items={[{ title: "Move to trash" }]}>
                    <MoreHorizIcon fontSize='inherit' color='inherit' />
                </MoreMenu>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cx('container')}>
                    <div className={cx('group')}>
                        <TextField
                            variant="trello"
                            label="ID"
                            readOnly
                            disabled
                            {...register("id", { required: true })}
                            error={errors.id ? "ID is required" : null}
                        />
                        <TextField label="CreatorId"
                            variant="trello"
                            disabled
                            readOnly
                            {...register("creator", { required: true })}
                            error={errors.creator ? "Creator ID is required" : null}
                        />
                    </div>
                    <TextField
                        label="Project Name"
                        variant="trello"
                        {...register("projectName", { required: true })}
                        error={errors.projectName ? "Project Name is required" : null}
                    />
                    <MenuSelect
                        value={selectedProject?.projectCategory}
                        serviceAPI={anothersAPI.getProjectCategories}
                        getItemsKey={(item) => item.id}
                        getSearchKey={item => item.projectCategoryName}
                        renderItem={item => (
                            <div className={cx('categoryItem')}>
                                {item.projectCategoryName || item.name}
                            </div>
                        )}
                        label='Category'
                        selectPlaceHolder={<div className={cx('categoryItem')}>Select Category</div>}
                        ref={selectRef}
                    />
                    <MyCkEditor
                        label='Description'
                        editorRef={editorRef}
                        data={selectedProject?.description}
                    />
                    <Button solid className={cx('submitBtn')}>Save</Button>
                </div>
            </form>
        </div>
    )
}

export default ProjectSetting