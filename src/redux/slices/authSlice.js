import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import localService from '../../services/localService'

import userAPI from '../../services/userAPI'

const initialState = {
    user: localService.user.get() || null,
    loading: false,
    error: false
}

export const login = createAsyncThunk(
    'authenticate/login',
    async (values) => {
        try {
            const data = await userAPI.signin(values)
            localService.user.set(data)
            return data
        } catch (error) {
            throw error
        }
    }
)

const authSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        logout: (state, action) => {
            localService.user.remove()
            return {
                ...state,
                user: null
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: false
            }
        })

        builder.addCase(login.fulfilled, (state, action) => {
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        })

        builder.addCase(login.rejected, (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer