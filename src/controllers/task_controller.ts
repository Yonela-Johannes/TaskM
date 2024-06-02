import TaskModel from "../models/task.model";
import {  Request, Response } from 'express';
import cron from 'node-cron';
import { validateMongoDbId } from "../utils/validateMongoDbId";

// Create task
// @desc Create new task
// @route POST /api/users/{user_id}/tasks
// @access User
export const createTask = async (req: Request, res: Response) => {
  const { user_id } = req.params
  const {name, description, status, date_time, next_execute_date_time} = req.body;
  validateMongoDbId(user_id, res);

  const task = new TaskModel({name, description, status, date_time, user: user_id, next_execute_date_time})

  try {
    await task.save();
    res.status(200).json({ message: 'TaskModel created'}).end()
  } catch (error: any) {
    res.status(409).json({message: error.message}).end()
  }
}

// Fetch tasks
// @desc Retrieve all tasks
// @route GET /api/users/{user_id}/tasks/{task_id}
// @access Public
export const getTasks = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  validateMongoDbId(user_id, res);

  try {
      const tasks = await TaskModel.find({user: user_id}).populate('user').sort({"date_time": -1});
      res.status(200).json(tasks).end()
  } catch (error: any) {
    res.status(500).json({message: error.message}).end()
  }
}

// Fetch task
// @desc Fetch task info
// @route GET /api/users/{user_id}/tasks/{task_id}
// @access User
export const getTask = async (req: Request, res: Response) => {
  const { user_id, task_id} = req.params;

  validateMongoDbId(user_id, res);
  validateMongoDbId(task_id, res);

  try {
      const task = await TaskModel.findOne({_id: task_id, user: user_id}).populate('user');
      res.status(200).json(task).end()
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

// Update task
// @desc Edit task
// @route PUT /api/users/{user_id}/tasks/{task_id}
// @access User
export const updateTask = async (req: Request, res: Response) => {
  const { user_id, task_id} = req.params;
  const { name, description, next_execute_date_time } = req.body

  validateMongoDbId(user_id, res);
  validateMongoDbId(task_id, res);

  try {
    const task = await TaskModel.findOneAndUpdate({_id: task_id, user: user_id}, 
      {name, description, next_execute_date_time}, 
      {new: true}
    );
    return res.status(200).end();
  } catch (error: any) {
    return res.status(500).json({message: error.message}).end();
  }
};

// Delete task
// @desc Delete task
// @route DELETE /api/users/{user_id}/tasks/{task_id}
// @access User
export const deleteTask = async (req: Request, res: Response) => {
  const { user_id, task_id} = req.params;

  validateMongoDbId(user_id, res);
  validateMongoDbId(task_id, res);

  try {
    await TaskModel.findOneAndDelete({_id: task_id, user: user_id});
    const task = await TaskModel.findOne({_id: task_id, user: user_id});
    if(task){
      return res.status(500).end();
    }
    return res.status(200).json({message: 'TaskModel deleted successful'});
  } catch (error: any) {
    return res.status(404).json({message: error.message}).end();
  }
}


// Cron update task statuses
cron.schedule('* * * * *', async () => { 
  const now = new Date();

  try {
      const tasks = await TaskModel.find({
          status: 'pending',
          next_execute_date_time: { $lt: now },
      });

      tasks.forEach(async (task) => {
          console.log(`TaskModel: ${task.name}, Next Execute Date Time: ${task.next_execution_date_time}`);
          task.status = 'done';
          await task.save();
      });

      console.log('Checked and updated task statuses');
  } catch (error) {
      console.error('Error updating task statuses:', error);
  }
});
