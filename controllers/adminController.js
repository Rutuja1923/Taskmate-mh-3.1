const User = require('../models/User');
const Task = require('../models/Task');

//GET admin/tasks
//the admin can see the task list created by all the users
async function handleGetAllTasks(req, res) {
    try {
        const tasks = await Task.find( {} );

        if (tasks.length === 0) {
            return res.status(200).json(
                { 
                    status : "Success", 
                    message : "No tasks found.", 
                    tasks : [], 
                }
            );
        }
        res.status(200).json(
            { 
                status : "Success", 
                tasks : tasks, 
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
 
//GET admin/users
//the admin can see the list of all users
async function handleGetAllUsers(req, res){
    try {
        const users = await User.find( {} );

        if (users.length === 0) {
            return res.status(200).json(
                { 
                    status : "Success", 
                    message : "No users found. Start by adding a new task!", 
                    users : [], 
                }
            );
        }
        res.status(200).json(
            { 
                status : "Success", 
                users : users, 
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

//DELETE /admin/users/:id
//the admin can delete a user by his id
async function handleRemoveUser(req, res){
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json(
                { 
                    status : "Error", 
                    message: "User not found!",
                }
            );
        }

        //delete the tasks created by the user
        const deletedTasks = await Task.deleteMany( {userId : id} );

        res.status(200).json(
            { 
                status: "Success", 
                message: "User & associated tasks are deleted!" 
            }
        );
    } 
    catch (error) {
        res.status(500).json(
            { 
                status: "Server Error", 
                message: error.message, 
            }
        );
    }
}

module.exports = { handleGetAllTasks, handleGetAllUsers, handleRemoveUser };