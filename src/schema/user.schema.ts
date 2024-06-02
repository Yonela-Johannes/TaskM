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
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           default: "John"
 *         last_name:
 *           type: string
 *           default: "Smith"
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
 *         updatedAt:
 *           type: string
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
 *           updatedAt:
 *             type: string
 *           _id:
 *             type: string
 */

export const createUserSchema = object({
    body: object({
      username: string({
        required_error: "Name is required",
      }),
      first_name: string({
        required_error: "First name is required",
      }),
      last_name: string({
        required_error: "Last name is required",
      }),
    })
  });