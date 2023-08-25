import express from 'express';
import { usersPostController, usersGetManyController, usersGetOneController, usersPatchOneController, usersDeleteOneController } from '../controller/usersController.js';
import { hashPassword } from '../middleware/hashPassword.js';
import { verifyToken } from '../middleware/verifyToken.js';
const app = express();
app.use(express.json());
const usersRouter = express.Router();
usersRouter.use(verifyToken);
//routes verify token middleware
//routes
usersRouter.post("/", hashPassword, usersPostController);
usersRouter.get("/", usersGetManyController);
usersRouter.get("/:id", usersGetOneController);
usersRouter.get("/username", usersGetOneController);
usersRouter.patch("/:id", hashPassword, usersPatchOneController);
usersRouter.delete("/:id", usersDeleteOneController);
export default usersRouter;
