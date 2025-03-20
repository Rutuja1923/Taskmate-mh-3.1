const User = require('../models/User');
const Task = require('../models/Task');

//GET /admin/tasks
//the admin can see the task list created by all the users
async function handleGetAllTasks(req, res) {
    try {
        const tasks = await Task.find().populate('userId', 'name');
        return res.json(tasks);  
    } 
    catch (error) {
        console.log(`Error in fetching tasks: ${error}`);
    }
}
 
//GET /admin/users
//the admin can see the list of all users
async function handleGetAllUsers(req, res){
    try {
        const users = await User.find( {} );
        return res.json(users);
    } 
    catch (error) {
        console.log(`Error in fetching users: ${error}`);
    }
}

module.exports = { handleGetAllTasks, handleGetAllUsers };