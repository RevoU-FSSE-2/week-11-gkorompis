import express from 'express';
import { usersPostController, usersGetManyController, usersGetOneController, usersPatchOneController, usersDeleteOneController } from '../controller/usersController.js';
import { hashPassword } from '../middleware/hashPassword.js';
import { verifyToken } from '../middleware/verifyToken.js';
const app = express();
app.use(express.json());
const usersRouter = express.Router();
//routes verify token middleware
//routes
usersRouter.post("/", hashPassword, usersPostController);
usersRouter.get("/", verifyToken, usersGetManyController);
usersRouter.get("/:id", verifyToken, usersGetOneController);
usersRouter.get("/username", verifyToken, usersGetOneController);
usersRouter.patch("/:id", verifyToken, usersPatchOneController);
usersRouter.delete("/:id", verifyToken, usersDeleteOneController);
export default usersRouter;
