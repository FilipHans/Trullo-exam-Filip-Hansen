import mongoose, { InferSchemaType } from 'mongoose';

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
            ref: "User",
            default: null
            },
        finishedAt: {type: Date, default: null},
        createdAt: {type: Date, default: () => new Date()},
        finishedBy: {type: mongoose.Schema.Types.ObjectId, default: null}
        

    },
    { timestamps: true }

)

const Task = mongoose.model('Tasks', TaskSchema);
export type TaskType = InferSchemaType<typeof TaskSchema>
export type TaskTypePartial = Partial<TaskType>
export default Task;