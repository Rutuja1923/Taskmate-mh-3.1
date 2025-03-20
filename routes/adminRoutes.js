const express = require('express');
const { checkForAuthentication, restrictTo } = require("../middlewares/authMiddleware");
const { handleGetAllTasks, handleGetAllUsers } = require('../controllers/adminController');

const router = express.Router();

router.get("/", checkForAuthentication, restrictTo(["admin"]), (req, res) => {
    res.render("adminHome", { user: req.user });
});

router.get("/tasks", checkForAuthentication, restrictTo(["admin"]), handleGetAllTasks);
router.get("/users", checkForAuthentication, restrictTo(["admin"]), handleGetAllUsers);

module.exports = router;
