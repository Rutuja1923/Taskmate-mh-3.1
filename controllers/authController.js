const User = require("../models/User");
const { setUser } = require("../services/auth");

//POST user/signup 
//Register a new user
async function handleUserSignup (req, res) {
    try {
        const {name, email, password} = req.body;

        let existingUser = await User.findOne( {email} );

        if (existingUser) {
            return res.render("signup-failed", { 
                message: "User Already Exists. Please use a different email to register." 
            });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        res.redirect("/login");
    }
    catch (error) {
        console.log("Error in User Login. " + error);
        res.status(500).json(
            { 
                status : "Server Error", 
                message : error.message, 
            }
        );
    }
}

//POST user/login
//Authenticate user & set JWT in cookies
async function handleUserLogin (req, res) {
    try {
        const {email, password} = req.body;

        const user = await User.findOne( {email} );

        if (!user || !(await user.comparePassword(password))) {
            return res.render("login-failed", { 
                message: "Oops! Invalid Email or Password. Please sign up if not registered or login with correct details."
            });
        }

        const token = setUser(user);
        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production'
        });

        res.redirect("/");
    }
    catch (error) {
        console.log("Error in Creating New User. "+ error);
        res.status(500).json(
            { 
                status : "Server Error", 
                message : error.message, 
            }
        );
    }
}

module.exports = {handleUserSignup , handleUserLogin}