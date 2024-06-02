import mongoose from "mongoose";

export interface TaskDocument extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  date_time: Date;
  next_execution_date_time: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    date_time: {
      type: Date,
      required: true
    },
    next_execute_date_time: Date,
    status: {
      type: String,
      enum : ['pending','done'],
      default: 'pending'
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema);

export default TaskModel