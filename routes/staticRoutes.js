const express = require("express");
const router = express.Router();
const {checkForAuthentication} = require('../middlewares/authMiddleware');
const { handleGetTasks } = require("../controllers/taskController");

router.get("/", async (req, res) => {
    //console.log(req.user);

    let tasks = null;

    //make a request to taskRoutes to get all the tasks of the user
    if (req.user) {
        tasks = await handleGetTasks(req);
    }

    return res.render("home", { 
        user: req.user || null,
        tasks: tasks,
    });
});

router.get('/signup', (req,res) => {
    return res.render('signup');
});

router.get('/login', (req,res) => {
    return res.render('login');
});

router.get("/logout", checkForAuthentication, (req, res) => {
    try {   
        //clear the cookie : token string 
        res.clearCookie("token", { httpOnly: true});

        return res.redirect("/");
    } 
    catch (error) {
        console.log(`Error in logging out user : ${error}`);
    }
});

module.exports = router;