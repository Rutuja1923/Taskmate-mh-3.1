const User = require("../models/User");
const { setUser } = require("../services/auth");

//POST /api/auth/signup 
//Register a new user
async function handleUserSignup (req, res) {
    try {
        const {name, email, password} = req.body;

        let existingUser = await User.findOne( {email} );

        if (existingUser) {
            return res.status(400).json(
                {
                    status : "Error",
                    message : "User Already Exists",
                }
            );
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json(
            { 
                status : "Success",
                message : "User Registered Successfully", 
            }
        );
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

//POST /api/auth/login
//Authenticate user & set JWT in cookies
async function handleUserLogin (req, res) {
    try {
        const {email, password} = req.body;

        const user = await User.findOne( {email} );

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json(
                { 
                    status : "Error",
                    message : "Invalid Email or Password" ,
                }
            );
        }

        const token = setUser(user);
        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(200).json(
            {   
                status : "Success",
                message: `Welcome Back ${user.name}`, 
                userId: user._id,
                token: token,
            }
        );
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

//POST /api/auth/logout
//logout user (clear token cookie)
function handleUserLogout (req, res) {
    try {
        if (!req.cookies.token) {
            return res.status(400).json(
                { 
                    status : "Error",
                    message: "No Active Session Found", 
                }
            );
        }
        
        //clear the cookie : token string 
        res.clearCookie("token", { httpOnly: true});

        res.status(200).json(
            { 
                status : "Success",
                message : "Logged Out Successfully", 
            }
        );
    } 
    catch (error) {
        res.status(500).json(
            { 
                status : "Server Error", 
                message : error.message, 
            }
        );
    }
    
}

module.exports = {handleUserSignup , handleUserLogin, handleUserLogout}