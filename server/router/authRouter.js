import express from 'express';
import { setTimeLastLogin } from '../middleware/timestamps.js';
import { authPostController } from '../controller/authController.js';
import { verifyLoginUser } from '../middleware/authentication.js';
const app = express();
app.use(express.json());
const authRouter = express.Router();
/**
 * @openapi
 * paths:
 *   /prod/auth/login:
 *     post:
 *       summary: Sign In - User Authentication
 *       tags:
 *          - Sign In
 *       description: |
 *         This endpoint allows users to sign in and authenticate.
 *         Provide a valid username and password to sign in.
 *         Passwords must be alphanumeric and at least 8 characters long.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             example:
 *               username: "lorem_alpha"
 *               password: "revouREVOU2023"
 *       responses:
 *         '200':
 *           description: Successful sign-in, returns an authentication token (string)
 *         '400':
 *           description: Bad Request - Invalid sign-in request
 *         '403':
 *           description: Forbidden - Unauthorized access to sign-in
 *         '409':
 *           description: Conflict - Sign-in conflict, user already signed in
 *         '500':
 *           description: Internal Server Error - An unexpected error occurred during sign-in
 *       security:
 *         - bearerAuth: []  # Requires a valid bearer token for all roles (admin, member_basic, member_premium)
 */
//middlewares
const postMiddlewares = [verifyLoginUser, setTimeLastLogin];
//routes
authRouter.post("/login", postMiddlewares, authPostController);
export default authRouter;
