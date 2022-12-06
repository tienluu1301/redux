import axios from 'axios'
import localService from './localService'

const fetcher = axios.create({
    baseURL: "https://jiranew.cybersoft.edu.vn/api",
    headers: {
        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMiIsIkhldEhhblN0cmluZyI6IjE1LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTUxNjgwMDAwMCIsIm5iZiI6MTY1MzkzMDAwMCwiZXhwIjoxNjgxNjY0NDAwfQ.oR9K8iSTqbo-t0Q_a-WFnKePPaMAr7sdlgR5xKAtQWA",
    }
})

fetcher.interceptors.response.use(
    (response) => {
        return response.data.content
    },
    (error) => {
        return Promise.reject(error.response.data.message)
    }
)

fetcher.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localService.user.get()?.accessToken}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default fetcher