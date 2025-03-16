const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    taskTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['in progress', 'completed'],
        default: 'in progress',
    },
},
{
    timestamps: true,
},
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
