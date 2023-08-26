import express from 'express';


import {
    authPostController,
} from '../controller/authController.js'

import { hashPassword } from '../middleware/hashPassword.js';

const app = express();
app.use(express.json());
const authRouter = express.Router();

//routes verify token middleware
//routes
authRouter.post("/login", authPostController);

export default authRouter;