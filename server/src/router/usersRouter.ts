import express from 'express';
import {
    usersPostController,
} from '../controller/usersController.js'

import {setTimeCreated} from '../middleware/timestamps.js'
import {setTimeUpdated} from '../middleware/timestamps.js'
import {hashPassword} from '../middleware/hashPassword.js'

const app = express();
app.use(express.json());
const usersRouter = express.Router();

/**
 * @openapi
 * paths:
 *   /users:
 *     post:
 *       summary: Register a New User
 *       tags: 
 *          - Users and Sign Up
 *       description: |
 *         This endpoint allows you to register a new user.
 *         To register, provide user details including name, email, username, role, and a password.
 *         Passwords must be alphanumeric and at least 8 characters long.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             example:
 *               name: "lorem"
 *               email: "lorem@email.com"
 *               username: "lorem_alpha"
 *               role: "admin"
 *               password: "revouREVOU2023"
 *       responses:
 *         '200':
 *           description: Successful registration
 *           content:
 *             application/json:
 *               example:
 *                 acknowledged: true
 *                 insertedId: "64f23f8794701a7f79ce8863"
 *         '400':
 *           description: Bad Request - Invalid user registration request
 *         '403':
 *           description: Forbidden - Unauthorized access to register
 *         '409':
 *           description: Conflict - User registration conflict, user already exists
 *         '500':
 *           description: Internal Server Error - An unexpected error occurred during registration
 */


//middlewares
const postMiddlewares = [hashPassword, setTimeCreated, setTimeUpdated]

//routes
usersRouter.post("/", postMiddlewares, usersPostController);

export default usersRouter;