import express from 'express';
import { setTimeCreated } from '../middleware/timestamps.js';
import { setTimeUpdated } from '../middleware/timestamps.js';
import { storageReportGetController, storageReportPostController, storageReportDownloadController } from '../controller/storageReportController.js';
// import {approvestorageReport, rejectstorageReport, softDeletestorageReport} from '../middleware/patchstorageReport.js'
import { verifyToken } from '../middleware/authentication.js';
import { getSignedS3Url, uploadFileToServer, uploadFromServerToS3 } from '../middleware/storageReportsMiddleware.js';
const app = express();
app.use(express.json());
const storageReportRouter = express.Router();
//middlewares
const postMiddlewares = [verifyToken, uploadFileToServer.single('file'), uploadFromServerToS3, setTimeCreated, setTimeUpdated];
const getMiddlewares = [verifyToken, setTimeUpdated];
const getDownloadMiddlewares = [verifyToken, getSignedS3Url, setTimeUpdated];
const patchApproveMiddlewares = [verifyToken, setTimeUpdated];
const patchRejectMiddlewares = [verifyToken, setTimeUpdated];
const patchSoftDeleteMiddlewares = [verifyToken, setTimeUpdated];
//routes
storageReportRouter.post("/", postMiddlewares, storageReportPostController);
storageReportRouter.get("/", getMiddlewares, storageReportGetController);
storageReportRouter.get("/download/:bucketKey", getDownloadMiddlewares, storageReportDownloadController);
// storageReportRouter.patch("/approve", patchApproveMiddlewares, storageReportPatchController);
export default storageReportRouter;
