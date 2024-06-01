import express from 'express';
import { getAllUsers, getUser, updateUser, createUser, deleteUser } from "../controllers/user_controller";
import { getTasks, getTask, updateTask, createTask, deleteTask } from "../controllers/task_controller";

const router = express.Router()

const taskRoute : string = "/:user_id/tasks";

export default () => {
    // User Routes
    router.post("/", createUser);
    router.get("/", getAllUsers);
    router.get("/:id", getUser);
    router.put("/:id", updateUser);
    router.delete("/:id", deleteUser);

    // Task Routes
    router.post(taskRoute, createTask);
    router.get(taskRoute, getTasks);
    router.get(taskRoute + "/:task_id", getTask);
    router.put(taskRoute + "/:task_id", updateTask);
    router.delete(taskRoute + "/:task_id", deleteTask); 
    return router
}