import express from 'express';
import {setTimeCreated} from '../middleware/timestamps.js'
import {setTimeUpdated} from '../middleware/timestamps.js'
import { storageReportGetController, storageReportPostController, storageReportPatchController, storageReportDownloadController} from '../controller/storageReportController.js';
// import {approvestorageReport, rejectstorageReport, softDeletestorageReport} from '../middleware/patchstorageReport.js'
import { verifyToken } from '../middleware/authentication.js';
import {getSignedS3Url, uploadFileToServer, uploadFromServerToS3 } from '../middleware/storageReportsMiddleware.js'

const app = express();
app.use(express.json());
const storageReportRouter = express.Router();

//openapi
/**
 * @openapi
 * /storageReports:
 *   get:
 *     tags:
 *       - Report Storage
 *     summary: Get Storage Reports
 *     description: |
 *       Retrieve storage reports from the API. Requires authorization with a valid bearer token (JWT).
 *       Admin users can retrieve all reports, while member_basic and member_premium users can only access reports
 *       that match their username.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Insert your JWT token here.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with storage reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   owner:
 *                     type: array
 *                     items:
 *                       type: string
 *                   expiredAt:
 *                     type: string
 *                   bucketKey:
 *                     type: string
 *                   createdTime:
 *                     type: string
 *                   updatedTime:
 *                     type: string
 *             example:
 *               - _id: "64f15af588aaa2a115ff0567"
 *                 owner: ["alpha_110"]
 *                 expiredAt: "2023-09-01T10:30:58.613Z"
 *                 bucketKey: "tests3.pdf"
 *                 createdTime: "2023-09-01T03:30:58.613Z"
 *                 updatedTime: "2023-09-01T03:30:58.613Z"
 *       '400':
 *         description: Bad Request - Invalid request
 *       '403':
 *         description: Forbidden - Unauthorized access
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT)
 */

/**
 * @openapi
 * /storageReports:
 *   post:
 *     tags:
 *       - Report Storage
 *     summary: Upload Report File
 *     description: |
 *       Upload a report file to AWS S3 cloud storage. Requires authorization with a valid bearer token (JWT).
 *       Only admin users are allowed to upload reports.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Insert your JWT token here.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *           example:
 *             file: filename.pdf
 *     responses:
 *       '200':
 *         description: Successful response with inserted ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                 insertedId:
 *                   type: string
 *             example:
 *               acknowledged: true
 *               insertedId: "64f2723c494ca64100d4cb95"
 *       '400':
 *         description: Bad Request - Invalid request
 *       '403':
 *         description: Forbidden - Unauthorized access
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT), only admin can upload
 */

/**
 * @openapi
 * /prod/storageReports/download/{bucketKey}:
 *   get:
 *     tags:
 *       - Report Storage
 *     summary: Download Report
 *     description: |
 *       Download a report file from AWS S3 cloud storage. Requires authorization with a valid bearer token (JWT).
 *       Admin users can download any report, while other users can only download reports matching their role's username.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Insert your JWT token here.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: bucketKey
 *         required: true
 *         description: The name of the bucket key for the report to download.
 *     responses:
 *       '200':
 *         description: Successful response with report data
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             description: The filename of the downloaded report.
 *             schema:
 *               type: string
 *           Content-Type:
 *             description: The MIME type of the downloaded report.
 *             schema:
 *               type: string
 *       '400':
 *         description: Bad Request - Invalid request
 *       '403':
 *         description: Forbidden - Unauthorized access
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT), admin can download anything
 */


//middlewares
const postMiddlewares = [verifyToken, uploadFileToServer.single('file'),uploadFromServerToS3, setTimeCreated, setTimeUpdated]
const getMiddlewares = [verifyToken,setTimeUpdated];
const getDownloadMiddlewares = [verifyToken, getSignedS3Url,setTimeUpdated];
const patchApproveMiddlewares = [verifyToken, setTimeUpdated]
const patchRejectMiddlewares = [verifyToken, setTimeUpdated]
const patchSoftDeleteMiddlewares = [verifyToken, setTimeUpdated]
//routes
storageReportRouter.post("/", postMiddlewares, storageReportPostController);
storageReportRouter.get("/", getMiddlewares, storageReportGetController);
storageReportRouter.get("/download/:bucketKey", getDownloadMiddlewares, storageReportDownloadController)
// storageReportRouter.patch("/approve", patchApproveMiddlewares, storageReportPatchController);

export default storageReportRouter;