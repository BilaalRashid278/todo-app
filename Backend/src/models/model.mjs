import mongoose from "mongoose";
import { Schema } from "mongoose";
const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    dueDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'in-progress'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const todoModel = mongoose.model(`todos`,TodoSchema);
export default todoModel;


