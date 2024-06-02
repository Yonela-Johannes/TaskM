import express, { Request, Response } from 'express';
import { getAllUsers, getUser, updateUser, createUser, deleteUser } from "../controllers/user.controller";
import { getTasks, getTask, updateTask, createTask, deleteTask } from "../controllers/task_controller";
import validate from '../utils/validateResource';
import { createUserSchema, createTaskSchema } from '../schema/schemas';

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
 *       - Create User
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
 *       - Get Users
 *     summary: Fetch all users
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

/**
 * @openapi
 * /api/users/{user_id}/tasks:
 *   post:
 *     tags:
 *       - Create User Tasks
 *     summary: Create a user task
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
 *             $ref: '#/components/schemas/CreateUserTask'
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/components/schemas/UserTaskResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad Request
 */

// Create task
    router.post(taskRoute, validate(createTaskSchema), createTask);
    
/**
 * @openapi
 * /api/users/{user_id}/tasks:
 *   get:
 *     tags:
 *       - Get Tasks
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: The id of the user
 *         required: true
 *     summary: Fetch user Task info
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTasksResponse'
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found
 */

 // Get user tasks
    router.get(taskRoute, getTasks);

   
/**
 * @openapi
 * /api/users/{user_id}/tasks/{task_id}:
 *   get:
 *     tags:
 *       - Get Task
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the user
 *         required: true
 *       - name: task id
 *         in: path
 *         description: The id of the task
 *         required: true
 *     summary: Fetch user Tasks
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTaskResponse'
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found
 */

 // Get user task
    router.get(taskRoute + "/:task_id", getTask);

    
/**
 * @openapi
 * /api/users/{user_id}/tasks/{task_id}:
 *   put:
 *     tags:
 *       - Update Tasks
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: The id of the user
 *         required: true
 *     summary: Update user Task info
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserTaskInput'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found
 */

 // Update user tasks
    router.put(taskRoute + "/:task_id", updateTask);
    
/**
 * @openapi
 * /api/users/{user_id}/tasks:
 *   delete:
 *     tags:
 *       - Delete Task
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: The id of the user
 *         required: true
 *       - name: task_id
 *         in: path
 *         description: The id of the task
 *         required: true
 *     summary: Delete user Task
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: Not Found
 */

 // Delte user tasks
    router.delete(taskRoute + "/:task_id", deleteTask); 
    return router
}