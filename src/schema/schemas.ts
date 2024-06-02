import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - username
 *         - first_name
 *         - last_name
 *       properties:
 *         username:
 *           type: string
 *           default: "jsmith"
 *         first_name:
 *           type: string
 *           default: "John"
 *         last_name:
 *           type: string
 *           default: "Smith"
 *     UpdateUserTaskInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           default: "Update task"
 *         description:
 *           type: string
 *           default: "Update description of task"
 *         next_execute_date_time:
 *           type: string
 *           format: date-time
 *           default: "2016-05-25T14:25:00Z"
 *     UserResponse:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         _id:
 *           type: string
 *     UsersResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *           first_name:
 *             type: string
 *           last_name:
 *             type: string
 *           createdAt:
 *             type: string
 *             format: date-time
 *           updatedAt:
 *             type: string
 *             format: date-time
 *           _id:
 *             type: string
 *     CreateUserTask:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - date_time
 *       properties:
 *         name:
 *           type: string
 *           default: "My task"
 *         description:
 *           type: string
 *           default: "Description of task"
 *         date_time:
 *           type: string
 *           format: date-time
 *           default: "2016-05-25T14:25:00Z"
 *     UpdateUserTaskresponse:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - next_execute_date_time
 *       properties:
 *         name:
 *           type: string
 *           default: "My task"
 *         description:
 *           type: string
 *           default: "Description of task"
 *         next_execute_date_time:
 *           type: string
 *           format: date-time
 *           default: "2016-05-25T14:25:00Z"
 *     UserTaskResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         date_time:
 *           type: string
 *           format: date-time
 *         next_execute_date_time:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         _id:
 *           type: string
 *     UserTasksResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           date_time:
 *             type: string
 *             format: date-time
 *           next_execute_date_time:
 *             type: string
 *             format: date-time
 *           status:
 *             type: string
 *           updatedAt:
 *             type: string
 *             format: date-time
 *           _id:
 *             type: string
 */

export const createUserSchema = object({
    body: object({
      username: string({
        required_error: "Username is required",
      }),
      first_name: string({
        required_error: "First name is required",
      }),
      last_name: string({
        required_error: "Last name is required",
      }),
    })
  });

  export const createTaskSchema = object({
    params: object({
      user_id: string({
        required_error: "User id is required",
      }),
    }),
    body: object({
      name: string({
        required_error: "Task name is required",
      }),
      description: string({
        required_error: "Description is required",
      }),
      date_time: string({
        required_error: "Date time is required",
      }),
      next_execute_date_time: string().optional(),
    })
  });