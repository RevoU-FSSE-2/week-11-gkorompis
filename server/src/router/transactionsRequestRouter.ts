import express from 'express';
import {
    transactionsRequestPostController,
    transactionsRequestGetManyController,
    transactionsRequestGetOneController,
    transactionsRequestPatchOneController, 
    transactionsRequestDeleteOneController
} from '../controller/transactionsRequestController.js'
import { hashPassword } from '../middleware/hashPassword.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { queryOnlySelf } from '../middleware/queryOnlySelf.js';
import { updateRequestPending } from '../middleware/makerMiddleware.js';
import { updateRequestApproved, updateRequestRejected } from '../middleware/approverMiddleware.js';
import { updateRequestDeleted } from '../middleware/adminMiddleware.js';

const app = express();
app.use(express.json());
const transactionsRequestRouter = express.Router();
transactionsRequestRouter.use(verifyToken)

//routes verify token middleware
//routes
transactionsRequestRouter.post("/", [hashPassword, updateRequestPending ], transactionsRequestPostController);
transactionsRequestRouter.get("/", queryOnlySelf, transactionsRequestGetManyController);
transactionsRequestRouter.get("/:id", transactionsRequestGetOneController);
transactionsRequestRouter.get("/username", transactionsRequestGetOneController);
transactionsRequestRouter.patch("/:id", hashPassword, transactionsRequestPatchOneController);
transactionsRequestRouter.patch("/approve/:id", updateRequestApproved, transactionsRequestPatchOneController);
transactionsRequestRouter.patch("/reject/:id", updateRequestRejected, transactionsRequestPatchOneController);
transactionsRequestRouter.patch("/delete/:id", updateRequestDeleted, transactionsRequestPatchOneController);
transactionsRequestRouter.delete("/:id", transactionsRequestDeleteOneController);

export default transactionsRequestRouter;