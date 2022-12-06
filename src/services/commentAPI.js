import fetcher from "./fetcher"

const commentAPI = {
    getComments: (taskId) => {
        return fetcher("/Comment/getAll", {
            params: {
                taskId
            }
        })
    },

    createComment: (values) => {
        return fetcher.post("/Comment/insertComment", values)
    },

    updateComment: (values) => {
        return fetcher.put("/Comment/updateComment", null, {
            params: {
                ...values
            }
        })
    },

    deleteComment: (idComment) => {
        return fetcher.delete("Comment/deleteComment", {
            params: {
                idComment
            }
        })
    }
}

export default commentAPI