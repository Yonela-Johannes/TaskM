import mongoose from "mongoose";

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

export const Task = mongoose.model("Task", taskSchema);
