import express from 'express';
import { usersPostController, } from '../controller/usersController.js';
import { hashPassword } from '../middleware/hashPassword.js';
const app = express();
app.use(express.json());
const usersRouter = express.Router();
//routes verify token middleware
//routes
usersRouter.post("/login", hashPassword, usersPostController);
export default usersRouter;
