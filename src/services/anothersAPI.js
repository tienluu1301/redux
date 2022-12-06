import fetcher from "./fetcher"

const anothersAPI = {
    getPriorities: (id) => {
        return fetcher("/Priority/getAll", {
            params: {
                id
            }
        })
    },

    getProjectCategories: () => {
        return fetcher("/ProjectCategory")
    },

    getTaskStatus: () => {
        return fetcher("/Status/getAll")
    },

    getTaskType: () => {
        return fetcher("/TaskType/getAll")
    }
}

export default anothersAPI