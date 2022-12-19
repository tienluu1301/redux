import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import projectAPI from '../../services/projectAPI'
// import anothersAPI from '../../services/anothersAPI'
import { statusMap } from '../../pages/KanbanBoard/dummyData'

const initialState = {
    task: null,
    loading: false,
    error: false,
    isTaskModalOpen: false
}

export const getTaskById = createAsyncThunk(
    'task/getTaskById',
    async (taskId) => {
        try {
            const data = await projectAPI.getTaskDetail(taskId)
            data.taskStatusDetail = {
                id: data.statusId,
                statusName: statusMap[data.statusId].name
            }

            return data
        } catch (error) {
            throw error
        }
    }
)

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        toggleTaskModal: (state, action) => {
            return {
                ...state,
                isTaskModalOpen: !!action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTaskById.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: false,
            }
        })

        builder.addCase(getTaskById.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                task: action.payload
            }
        })

        builder.addCase(getTaskById.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        })
    }
})

export const { toggleTaskModal } = taskSlice.actions
export default taskSlice.reducer