import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authSlice'
import project from './slices/projectSlice'
import user from './slices/userSlice'
import task from './slices/taskSlice'

const store = configureStore(
    {
        reducer: {
            auth,
            project,
            user,
            task
        }
    }
)

export default store