import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import projectAPI from '../../services/projectAPI'
// import anothersAPI from '../../services/anothersAPI'

const initialState = {
    projects: null,
    selectedProject: null,
    loading: false,
    error: false
}

export const getProjects = createAsyncThunk(
    'projects/getProjects',
    async (keyworks) => {
        try {
            const data = await projectAPI.getProjects(keyworks)
            return data
        } catch (error) {
            throw error
        }
    }
)

export const getProjectDetail = createAsyncThunk(
    'projects/getProjectDetail',
    async (id) => {
        try {
            const data = await projectAPI.getProjectDetail(id)

            data.lstTask = data.lstTask.reduce((result, task) => {
                return {
                    ...result,
                    [task.statusId]: { ...task }
                }
            }, {})
            return data
        } catch (error) {
            throw error
        }
    }
)

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        reOrderTask: (state, action) => {
            const currentState = JSON.parse(JSON.stringify(current(state)))

            const { source, destination } = action.payload

            //Lấy cột tương ứng cho nơi drag và nơi drop
            const sourceCol = currentState.selectedProject.lstTask[source.droppableId]
            const destinationCol = currentState.selectedProject.lstTask[destination.droppableId]

            //Lấy ra danh dách task tương ứng cho các cột
            let sourceTasks = [...sourceCol.lstTaskDeTail]
            let destinationTasks = [...destinationCol.lstTaskDeTail]

            // Nếu cùng 1 cột thì cho 2 danh sách cùng giá trị referrence
            if (source.droppableId === destination.droppableId) {
                destinationTasks = sourceTasks
            }

            // Cắt và lấy task đã cắt gắn vào cột tương ứng
            const [task] = sourceTasks.splice(source.index, 1)
            destinationTasks.splice(destination.index, 0, task)

            let newSelectedProject = { ...currentState.selectedProject }

            // Thay đổi danh sách các cột tương ứng bằng danh sách mới
            newSelectedProject.lstTask[source.droppableId].lstTaskDeTail = sourceTasks
            newSelectedProject.lstTask[destination.droppableId].lstTaskDeTail = destinationTasks

            return {
                ...state,
                selectedProject: newSelectedProject
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: false
            }
        })

        builder.addCase(getProjects.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                projects: action.payload
            }
        })

        builder.addCase(getProjects.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        })

        builder.addCase(getProjectDetail.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: false
            }
        })

        builder.addCase(getProjectDetail.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                selectedProject: action.payload
            }
        })

        builder.addCase(getProjectDetail.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        })
    }
})
export const { reOrderTask } = projectSlice.actions
export default projectSlice.reducer