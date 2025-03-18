const Task = require('../models/Task');

//POST /api/tasks
//Add New Task
async function handleAddTask(req, res) {
    try {
        const { title, description } = req.body;
        const newTask = await Task.create({ 
            taskTitle : title, 
            description : description, 
            userId : req.user._id, 
        });

        res.status(201).json(
            { 
                status : "Success", 
                message : "Task added!", 
                taskId : newTask._id, 
            }
        );
    } 
    catch (error) {
        res.status(500).json(
            { 
                status : "Server Error", 
                message : error.message 
            }
        );
    }
}

//GET api/tasks
//get all tasks for the logged in user
async function handleGetTasks(req, res) {
    try {
        const tasks = await Task.find( {userId: req.user._id} );

        if (tasks.length === 0) {
            return res.status(200).json(
                { 
                    status : "Success", 
                    message : "No tasks found. Start by adding a new task!", 
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

//PATCH api/tasks/update/:id
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
            return res.status(404).json(
                { 
                    status : "Error", 
                    message : "Task not found!", 
                }
            );
        }

        res.status(200).json(
            { 
                status : "Success", 
                message : "Task marked as completed!", 
                deletedTask : task, 
            });
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


//DELETE api/tasks/:id
//delete the task
async function handleDeleteTask(req, res) {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json(
                { 
                    status : "Error", 
                    message: "Task not found!",
                }
            );
        }

        res.status(200).json(
            { 
                status: "Success", 
                message: "Task deleted!" 
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                status: "Server Error", 
                message: error.message, 
            }
        );
    }
}

module.exports = { handleAddTask, handleGetTasks, handleUpdateTaskStatus, handleDeleteTask};
