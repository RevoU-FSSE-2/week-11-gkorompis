import express from 'express';
import { setTimeCreated } from '../middleware/timestamps.js';
import { setTimeUpdated } from '../middleware/timestamps.js';
import { storageReportGetController, storageReportPostController } from '../controller/storageReportController.js';
// import {approvestorageReport, rejectstorageReport, softDeletestorageReport} from '../middleware/patchstorageReport.js'
import { verifyToken } from '../middleware/authentication.js';
const app = express();
app.use(express.json());
const servicesRouter = express.Router();
//middlewares
const postMiddlewares = [verifyToken, setTimeCreated, setTimeUpdated];
const getMiddlewares = [verifyToken, setTimeUpdated];
const patchApproveMiddlewares = [verifyToken, setTimeUpdated];
const patchRejectMiddlewares = [verifyToken, setTimeUpdated];
const patchSoftDeleteMiddlewares = [verifyToken, setTimeUpdated];
//routes
servicesRouter.post("/", postMiddlewares, storageReportPostController);
servicesRouter.get("/", getMiddlewares, storageReportGetController);
// servicesRouter.patch("/approve", patchApproveMiddlewares, storageReportPatchController);
export default servicesRouter;
