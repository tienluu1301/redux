const USER = 'user'
const localService = {

    user: {
        set: (data) => {
            localStorage.setItem(USER, JSON.stringify(data))
        },
        get: () => {
            return JSON.parse(localStorage.getItem(USER))
        },
        remove: () => {
            localStorage.removeItem(USER)
        }
    }
}

export default localService