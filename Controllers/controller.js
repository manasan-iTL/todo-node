const path = require("path")
const root = path.resolve("./")
const {pool, getAllTasks, createTask, changeFlag, getUncompleteTask} = require("../Models/model.js")

const index = async (req, res) => {
    console.log("Index page")
    res.sendFile(path.join(root, "/index.html"))
}

const taskLists = async (req, res) => {
    try {
        const allTasks =  await pool.query(getUncompleteTask)
        res.json(allTasks)
        console.log(allTasks)
    } catch (err) {
        console.log(err.message)
    } finally {
    }
}

const newTask = async (req, res) => {
    try {
        const {value} = req.body
        const response = await pool.query(createTask, [value, false])
        console.log(response)
        res.json(response)
    } catch (err) {
        console.log(err.message)
    } 
}

const completeTask = async (req, res) => {
    try {
        console.log(req.body)
        const { id } = req.body
        console.log(id)
        const { flag } = req.body
        const response = await pool.query(changeFlag, [flag, id]) 
        console.log(response)
        res.json(response)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    index: index,
    newTask: newTask,
    taskLists: taskLists,
    completeTask: completeTask
}