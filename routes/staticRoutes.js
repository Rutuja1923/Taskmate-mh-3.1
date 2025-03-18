const express = require("express");
const router = express.Router();
const {checkForAuthentication} = require('../middlewares/authMiddleware');

router.get("/", (req, res) => {
    console.log(req.user);
    res.render("home", { 
        user: req.user || null,
        tasks: []
    });
});

module.exports = router;

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

        res.redirect("/");
    } 
    catch (error) {
        res.status(500).json(
            { 
                status : "Server Error", 
                message : error.message, 
            }
        );
    }
});