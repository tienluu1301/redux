import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

export default projectSlice.reducer