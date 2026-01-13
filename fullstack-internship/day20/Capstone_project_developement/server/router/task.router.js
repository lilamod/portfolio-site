const router = require("express").Router();
const taskController = require("../controller/task.controller");

router.post("/create", taskController.createTask);
router.get("/get", taskController.getMyTasks);
router.put("/update/:id", taskController.updateTask);
router.delete("/delete/:id", taskController.deleteTask);

module.exports = router;