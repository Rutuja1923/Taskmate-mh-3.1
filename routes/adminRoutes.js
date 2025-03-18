const express = require('express');
const { checkForAuthentication, restrictTo } = require("../middlewares/authMiddleware");
const { handleGetAllTasks, handleGetAllUsers, handleRemoveUser } = require('../controllers/adminController');

const router = express.Router();

router.get("/tasks", checkForAuthentication, restrictTo(["admin"]), handleGetAllTasks);
router.get("/users", checkForAuthentication, restrictTo(["admin"]), handleGetAllUsers);
router.delete("/users/:id", checkForAuthentication, restrictTo(["admin"]), handleRemoveUser);

module.exports = router;
