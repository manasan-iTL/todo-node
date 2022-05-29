const router = require("express").Router()
const controller = require("../Controllers/controller.js")
// router.get("", (req, res) => {
//     res.send("succesful return response")
// })

router.get("/", controller.index)
router.post("/create", controller.newTask)
router.get("/tasks", controller.taskLists)
router.post("/finish-task", controller.completeTask)

module.exports = router