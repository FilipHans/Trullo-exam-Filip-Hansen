import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
    {
        title: {type: String},
        description: {type: String},
        status: {
            type: String,
            enum: ["TO_DO", "IN_PROGRESS", "BLOCKED", "DONE"],
            default: "TO_DO"
        },
        assignedTo: 
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
        finishedAt: {type: Date, default: null},
        createdAt: {type: Date, default: () => new Date()},
        

    },
    { timestamps: true }

)

const Task = mongoose.model('Tasks', TaskSchema);

export default Task;