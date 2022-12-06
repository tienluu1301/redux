import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authSlice'
import project from './slices/projectSlice'
import user from './slices/userSlice'

const store = configureStore(
    {
        reducer: {
            auth,
            project,
            user
        }
    }
)

export default store