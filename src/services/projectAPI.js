import fetcher from "./fetcher"

const projectAPI = {
    createProject: (values) => {
        return fetcher.post("/Project/createProjectAuthorize", values)
    },

    getProjectDetail: (id) => {
        return fetcher("/Project/getProjectDetail", {
            params: {
                id
            }
        })
    },

    getProjects: (keyword) => {
        if (!keyword) keyword = null
        return fetcher("/Project/getAllProject", {
            params: {
                keyword
            }
        })
    },

    deleteProject: (projectId) => {
        return fetcher.delete("/Project/deleteProject", {
            params: {
                projectId
            }
        })
    },

    updateProject: (projectId, values) => {
        return fetcher.put("Project/updateProject", values, {
            params: {
                projectId
            }
        })
    },

    addUserToProject: (values) => {
        return fetcher.post("/Project/assignUserProject", values)
    },

    removeUserFromProject: (values) => {
        return fetcher.post("/Project/removeUserFromProject", values)
    },

    createTask: (values) => {
        return fetcher.post("/Project/createTask", values)
    },

    updateTask: (values) => {
        return fetcher.post("Project/updateTask", values)
    },

    deleteTask: (taskId) => {
        return fetcher.delete("Project/removeTask", {
            params: {
                taskId
            }
        })
    },
    getTaskDetail: (taskId) => {
        return fetcher("/Project/getTaskDetail", {
            params: {
                taskId
            }
        })
    },

    addUserToTask: (values) => {
        return fetcher.post("/Project/assignUserTask", values)
    },

    removeUserFromTask: (values) => {
        return fetcher.post("/Project/removeUserFromTask", values)
    },

    updateTaskStatus: (values) => {
        return fetcher.put("/Project/updateStatus", values)
    },

    updateTaskPriority: (values) => {
        return fetcher.put("/Project/updatePriority", values)
    },

    updateTaskDescription: (values) => {
        return fetcher.put("/Project/updateDescription", values)
    },

    updateTaskTimeTracking: (values) => {
        return fetcher.put("/Project/updateTimeTracking", values)
    },

    updateTaskEstimate: (values) => {
        return fetcher.put("/Project/updateEstimate", values)
    },
}

export default projectAPI