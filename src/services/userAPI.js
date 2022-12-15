import fetcher from "./fetcher"

const userAPI = {
    signup: (values) => {
        return fetcher.post("/Users/signup", values)
    },

    signin: (values) => {
        return fetcher.post("/Users/signin", values)
    },

    facebookLogin: (facebookToken) => {
        return fetcher.post("/Userss/facebooklogin", {
            facebookToken
        })
    },

    updateUser: (values) => {
        return fetcher.put("/Users/editUser", values)
    },

    deleteUser: (id) => {
        return fetcher.delete("/Users/deleteUser", {
            params: {
                id
            }
        })
    },

    getUsers: (keyword) => {
        if (!keyword) keyword = null
        return fetcher("/Users/getUser", {
            params: {
                keyword
            }
        })
    },

    getUserByProjectId: (idProject) => {
        return fetcher("/Users/getUserByProjectId", {
            params: {
                idProject
            }
        })
    },

    tesToken: () => {
        return fetcher.post("/Users/TestToken")
    }
}

export default userAPI