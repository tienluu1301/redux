import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userAPI from '../../services/userAPI'

const initialState = {
    users: null,
    selectedUser: null,
    loading: false,
    error: false
}

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (keyword) => {
        try {
            const data = await userAPI.getUsers(keyword)
            return data
        } catch (error) {
            throw error
        }
    }
)

export const getUsersDetail = createAsyncThunk(
    'users/getUsersDetail',
    async (userId) => {
        try {
            const data = await userAPI.getUsers(userId)
            // eslint-disable-next-line eqeqeq
            const user = data.find?.(item => item.userId == userId)
            return user
        } catch (error) {
            throw error
        }
    }
)

const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: false
            }
        })

        builder.addCase(getUsers.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        })

        builder.addCase(getUsers.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        })


        builder.addCase(getUsersDetail.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: false
            }
        })

        builder.addCase(getUsersDetail.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                selectedUser: action.payload
            }
        })

        builder.addCase(getUsersDetail.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        })

    }
})

export default userSlice.reducer