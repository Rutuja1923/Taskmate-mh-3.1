const express = require('express');
const { checkForAuthentication, restrictTo } = require("../middlewares/authMiddleware");
const { handleAddTask, handleGetTasks, handleUpdateTaskStatus, handleDeleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post("/", checkForAuthentication, restrictTo(["user"]), handleAddTask);
router.get("/", checkForAuthentication, restrictTo(["user"]), handleGetTasks);
router.patch("/update/:id", checkForAuthentication, restrictTo(["user"]), handleUpdateTaskStatus);
router.delete("/:id", checkForAuthentication, restrictTo(["user"]), handleDeleteTask);

module.exports = router;
