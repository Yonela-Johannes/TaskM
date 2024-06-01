import { validateMongoDbId } from "../config/validateMongoDbId";
import { User } from '../models/user_model';
import { Request, Response } from 'express';

// Create user
// @desc Create new user
// @route POST /api/users
// @access Public
export const createUser = async (req: Request, res: Response) => {
  let {
    username,
    first_name,
    last_name,
  } = req.body;

  try {
        const user = await User.create({
          username,
          first_name,
          last_name,
        });
        if (user) {
          res.status(201).json(user).end();
        }
  } catch (error: any) {
    return res.status(500).json({message: error.message}).end()
  }
};

// Fetch all users
// @desc Retrieve all user
// @route GET /api/users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users).end();
  } catch (error: any) {
    return res.status(500).json({message: error.message}).end()
  }
};

// Fetch user
// @desc Retrieve user
// @route GET /api/users/{id}
// access Users
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id, res);

  try {
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json(user).end();
    }
    return res.status(404).json({message: "User does not exist"})
  } catch (error: any) {
    return res.status(500).json({message: error.message}).end();
  }
};

// Update user
// @desc Edit user
// @route PUT /api/users/{id}
// access User
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body
  validateMongoDbId(id, res);

  try {
    const user = await User.findByIdAndUpdate(id, {
      first_name, last_name 
    }, {
      new: true,
    });
    return res.status(200).json(user).end();
  } catch (error: any) {
    return res.status(404).json({message: error.message}).end();
  }
};

// Delete user
// @desc Delete user
// @route DELETE /api/users/{id}
// access User
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateMongoDbId(id, res);

  try {
    await User.findByIdAndDelete(id);
    const user = await User.findById(id);
    if(user){
      return res.status(500).end();
    }
    return res.status(200).json({message: 'User deleted successful'});
  } catch (error: any) {
    return res.status(404).json({message: error.message}).end();
  }
};
