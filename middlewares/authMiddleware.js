const { getUser } = require("../services/auth");

//check if user is authenticated
async function checkForAuthentication(req, res, next) {
    try {
        const tokenCookie = req.cookies?.token;
        req.user = null;

        if (tokenCookie) {
            const user = await getUser(tokenCookie);
            if (user) {
                req.user = user;
            }
        }

        // console.log("User in checkForAuthentication:", req.user);

        if (!req.user) {
            return res.status(401).json(
                { 
                    status: "Error",
                    message: "Not authorized. Please log in.", 
                }
            );
        }

        next();
    } 
    catch (error) {
        return res.status(500).json(
            { 
                status: "Server Error",
                message: "Error in authentication check", 
                error: error.message 
            }
        );
    }
}

//restrict access based on roles
function restrictTo(roles) {
    return function (req, res, next) {
        // console.log("User in restrictTo:", req.user);

        if (!req.user) {
            return res.status(401).json(
                { 
                    status: "Error",
                    message: "Unauthorized access. Please log in.", 
                }
            );
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json(
                { 
                    status: "Forbidden",
                    message: "You do not have permission to access this resource.", 
                }
            );
        }

        next();
    };
}

module.exports = { checkForAuthentication, restrictTo };
