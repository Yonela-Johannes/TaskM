import express, { Request, Response } from 'express';
import { getAllUsers, getUser, updateUser, createUser, deleteUser } from "../controllers/user.controller";
import { getTasks, getTask, updateTask, createTask, deleteTask } from "../controllers/task_controller";
import validate from '../utils/validateResource';
import { createUserSchema } from '../schema/user.schema';


const router = express.Router()

const taskRoute : string = "/:user_id/tasks";

export default () => {

/**
 * @openapi
 * /api/users/healthcheck:
 *   get:
 *     tags:
 *       - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

// Healtcheck 
    router.get("/healtcheck", (req: Request, res: Response) => res.sendStatus(200))

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Create User Tasks
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/components/schemas/UserResponse'
 *       409:
 *         description: Conflict
 */

// Create user
    router.post("/", validate(createUserSchema), createUser);

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Fetch Users
 *     summary: Fetch users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersResponse'
 *       404:
 *         description: Not found
 */


 // Get user
    router.get("/", getAllUsers);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Get User
 *     summary: Get a user
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the user
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */

 // Get user
    router.get("/:id", getUser);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Update User
 *     summary: Update a user
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the user
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: Not found
 */


 // Update user
    router.put("/:id", updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Delete User
 *     summary: Delete a user
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the user
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */


 // delete user
    router.delete("/:id", deleteUser);

    router.get(taskRoute, getTasks);
    router.get(taskRoute + "/:task_id", getTask);
    router.put(taskRoute + "/:task_id", updateTask);
    router.delete(taskRoute + "/:task_id", deleteTask); 
    return router
}