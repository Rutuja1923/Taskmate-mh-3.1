const Task = require('../models/Task');

//POST /tasks
//Add New Task
async function handleAddTask(req, res) {
    try {
        const { title, description } = req.body;

        await Task.create({ 
            taskTitle : title, 
            description : description, 
            userId : req.user._id, 
        });

        return res.redirect("/");
    } 
    catch (error) {
        console.log(`Error in Adding Task. ${error}`);
        return res.redirect('/');
    }
}

//GET /tasks
//get all tasks for the logged in user
async function handleGetTasks(req, res) {
    try {
        const tasks = await Task.find( {userId: req.user._id} );

        if (tasks.length === 0) {
            return [];
        }
        return tasks;
    } 
    catch (error) {
        console.log(`Error in retrieving tasks: ${error}`);
        return [];
    }
}

//PATCH /tasks/update/:id
//update the status of the task
async function handleUpdateTaskStatus(req, res) {
    try {
        const { id } = req.params; 

        const task = await Task.findOneAndUpdate(
            { _id : id, userId : req.user._id },
            { $set : { status: "completed" } },
            { new : true }
        );

        if (!task) {
            return res.redirect('/');
        }

        return res.redirect('/');
    } 
    catch (error) {
        console.log(`Error in Updating Task Status ${error}`);
        return res.redirect('/');
    }
}

//DELETE /tasks/:id
//delete the task
async function handleDeleteTask(req, res) {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.redirect('/');
        }

        return res.redirect('/');
    } 
    catch (error) {
        console.error("Error deleting task:", error);
        res.redirect("/");
    }
}

module.exports = { handleAddTask, handleGetTasks, handleUpdateTaskStatus, handleDeleteTask};
