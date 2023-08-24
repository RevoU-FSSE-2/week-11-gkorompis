import express from 'express';
import {
    usersPostController
} from '../controller/usersController.js'

const app = express();
app.use(express.json());
const usersRouter = express.Router();

//routes verify token middleware
//routes
usersRouter.post("/", usersPostController);

export default usersRouter;