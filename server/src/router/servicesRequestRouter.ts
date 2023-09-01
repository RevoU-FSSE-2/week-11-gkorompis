import express from 'express';
import {setTimeCreated} from '../middleware/timestamps.js'
import {setTimeUpdated} from '../middleware/timestamps.js'
import { servicesRequestGetController, servicesRequestPostController, servicesRequestPatchController, servicesRequestGetOneController, servicesRequestDeleteOneController} from '../controller/servicesRequestController.js';
import {approveServicesRequest, pendingServiceRequest, rejectServicesRequest, restrictViewServiceRequest, softDeleteServicesRequest} from '../middleware/patchServicesRequest.js'
import { verifyToken } from '../middleware/authentication.js';

const app = express();
app.use(express.json());
const servicesRequestRouter = express.Router();



//openapi

//POST servicesRequest
/**
 * @openapi
 * /prod/servicesRequest:
 *   post:
 *     summary: Create New Service Request
 *     tags:
 *       - Service Request
 *     description: |
 *       Create a new service request.
 *       Requires authorization with a valid bearer token (JWT).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: The request body for creating a new service request.
 *             properties:
 *               requestedBy:
 *                 type: string
 *                 description: The username of the user making the request.
 *               status:
 *                 type: string
 *                 description: The status of the service request (e.g., "pending").
 *               requestedServices:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of requested services.
 *             example:
 *               requestedBy: "alpha_110"
 *               status: "pending"
 *               requestedServices:
 *                 - "LAB01"
 *     responses:
 *       '200':
 *         description: Successful creation of a new service request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates if the request was acknowledged.
 *                 insertedId:
 *                   type: string
 *                   description: The unique identifier for the created request.
 *             example:
 *               acknowledged: true
 *               insertedId: "64f24a27c703235334e8fa1c"
 *       '400':
 *         description: Bad Request - Invalid request
 *       '403':
 *         description: Forbidden - Unauthorized access
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT) for authorization
 */

//GET all servicesRequest
/**
 * @openapi
 * /prod/servicesRequest:
 *   get:
 *     summary: Retrieve All Service Requests
 *     tags:
 *       - Service Request
 *     description: |
 *       Retrieve a list of all service requests.
 *       Requires authorization with a valid bearer token (JWT).
 *       Query parameters can be used to filter results based on string fields.
 *     parameters:
 *       - in: query
 *         name: requestedBy
 *         schema:
 *           type: string
 *         description: Filter requests by the username of the requester (string)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter requests by status (string)
 *       - in: query
 *         name: requestedServices
 *         schema:
 *           type: string
 *         description: Filter requests by requested services (string)
 *     responses:
 *       '200':
 *         description: Successful retrieval of service requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the service request.
 *                   requestedBy:
 *                     type: string
 *                     description: The username of the requester.
 *                   status:
 *                     type: string
 *                     description: The status of the service request.
 *                   requestedServices:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: An array of requested services.
 *                   createdTime:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the request was created.
 *                   updatedTime:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the request was last updated.
 *             example:
 *               - _id: "64f0ebd9331d3c99b2d510b3"
 *                 requestedBy: "alpha_110"
 *                 status: "pending"
 *                 requestedServices: ["LAB01"]
 *                 createdTime: "2023-08-31T19:36:55.477Z"
 *                 updatedTime: "2023-08-31T19:36:55.477Z"
 *               - _id: "64f24a27c703235334e8fa1c"
 *                 requestedBy: "alpha_110"
 *                 status: "pending"
 *                 requestedServices: ["LAB01"]
 *                 createdTime: "2023-09-01T20:31:32.649Z"
 *                 updatedTime: "2023-09-01T20:31:32.649Z"
 *               - _id: "64f24b8bc703235334e8fa1d"
 *                 requestedBy: "alpha_110"
 *                 status: "pending"
 *                 requestedServices: ["LAB03"]
 *                 createdTime: "2023-09-01T20:37:28.651Z"
 *                 updatedTime: "2023-09-01T20:37:28.651Z"
 *       '400':
 *         description: Bad Request - Invalid request
 *       '403':
 *         description: Forbidden - Unauthorized access
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT) for authorization
 */

//GET one servicesRequest
/**
 * @openapi
 * /prod/servicesRequest/{id}:
 *   get:
 *     summary: Get One Service Request
 *     tags:
 *       - Services
 *     description: |
 *       Retrieve a specific service request by its unique identifier.
 *       Requires authorization with a valid bearer token (JWT).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the service request.
 *     responses:
 *       '200':
 *         description: Successful retrieval of the service request
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the service request.
 *                   requestedBy:
 *                     type: string
 *                     description: The username of the requester.
 *                   status:
 *                     type: string
 *                     description: The status of the service request.
 *                   requestedServices:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The requested services.
 *                   createdTime:
 *                     type: string
 *                     format: date-time
 *                     description: The creation timestamp of the service request.
 *                   updatedTime:
 *                     type: string
 *                     format: date-time
 *                     description: The last update timestamp of the service request.
 *             example:
 *               - _id: "64f24b8bc703235334e8fa1d"
 *                 requestedBy: "alpha_110"
 *                 status: "pending"
 *                 requestedServices: ["LAB03"]
 *                 createdTime: "2023-09-01T20:37:28.651Z"
 *                 updatedTime: "2023-09-01T20:37:28.651Z"
 *       '400':
 *         description: Bad Request - Invalid request
 *       '403':
 *         description: Forbidden - Unauthorized access
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT) for authorization
 */

//PATCH servicesRequest
/**
 * @openapi
 * /prod/servicesRequest/approve/{id}:
 *   patch:
 *     summary: Approve Service Request
 *     tags:
 *       - Service Request
 *     description: |
 *       Approve a service request by changing its status.
 *       Requires authorization with a valid bearer token (JWT).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the service request.
 *     responses:
 *       '200':
 *         description: Successful approval of the service request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates if the approval was acknowledged.
 *                 modifiedCount:
 *                   type: integer
 *                   description: The number of documents modified.
 *                 upsertedId:
 *                   type: null
 *                   description: The identifier for upserted documents (null in this case).
 *                 upsertedCount:
 *                   type: integer
 *                   description: The number of upserted documents.
 *                 matchedCount:
 *                   type: integer
 *                   description: The number of documents matched.
 *             example:
 *               acknowledged: true
 *               modifiedCount: 1
 *               upsertedId: null
 *               upsertedCount: 0
 *               matchedCount: 1
 *       '400':
 *         description: Bad Request - Invalid request
 *       '403':
 *         description: Forbidden - Unauthorized access
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT) for authorization
 */

//PATCH servicesRequest
/**
 * @openapi
 * /prod/servicesRequest/reject/{id}:
 *   patch:
 *     summary: Reject Service Request
 *     tags:
 *       - Service Request
 *     description: |
 *       Reject a service request by changing its status.
 *       Requires authorization with a valid bearer token (JWT).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the service request.
 *     responses:
 *       '200':
 *         description: Successful rejection of the service request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates if the rejection was acknowledged.
 *                 modifiedCount:
 *                   type: integer
 *                   description: The number of documents modified.
 *                 upsertedId:
 *                   type: null
 *                   description: The identifier for upserted documents (null in this case).
 *                 upsertedCount:
 *                   type: integer
 *                   description: The number of upserted documents.
 *                 matchedCount:
 *                   type: integer
 *                   description: The number of documents matched.
 *             example:
 *               acknowledged: true
 *               modifiedCount: 1
 *               upsertedId: null
 *               upsertedCount: 0
 *               matchedCount: 1
 *       '400':
 *         description: Bad Request - Invalid request
 *       '403':
 *         description: Forbidden - Unauthorized access
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT) for authorization
 */
//PATCH servicesRequest
/**
 * @openapi
 * /prod/servicesRequest/delete/{id}:
 *   patch:
 *     summary: Soft Delete Service Request
 *     tags:
 *       - Service Request
 *     description: |
 *       Soft delete a service request by changing its status.
 *       Requires authorization with a valid bearer token (JWT).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the service request.
 *     responses:
 *       '200':
 *         description: Successful soft deletion of the service request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates if the soft deletion was acknowledged.
 *                 modifiedCount:
 *                   type: integer
 *                   description: The number of documents modified.
 *                 upsertedId:
 *                   type: null
 *                   description: The identifier for upserted documents (null in this case).
 *                 upsertedCount:
 *                   type: integer
 *                   description: The number of upserted documents.
 *                 matchedCount:
 *                   type: integer
 *                   description: The number of documents matched.
 *             example:
 *               acknowledged: true
 *               modifiedCount: 1
 *               upsertedId: null
 *               upsertedCount: 0
 *               matchedCount: 1
 *       '400':
 *         description: Bad Request - Invalid request
 *       '403':
 *         description: Forbidden - Unauthorized access
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT) for authorization
 */

//Delete servicesRequest
/**
 * @openapi
 * /prod/servicesRequest/{id}:
 *   delete:
 *     summary: Delete Permanently Service Request
 *     tags:
 *       - Service Request
 *     description: |
 *       Permanently delete a service request.
 *       Requires authorization with a valid bearer token (JWT).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the service request.
 *     responses:
 *       '200':
 *         description: Successful permanent deletion of the service request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates if the deletion was acknowledged.
 *                 deletedCount:
 *                   type: integer
 *                   description: The number of documents deleted.
 *             example:
 *               acknowledged: true
 *               deletedCount: 1
 *       '400':
 *         description: Bad Request - Invalid request
 *       '403':
 *         description: Forbidden - Unauthorized access
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT) for authorization
 */




//middlewares
const postMiddlewares = [verifyToken, pendingServiceRequest, setTimeCreated, setTimeUpdated]
const getMiddlewares = [verifyToken, restrictViewServiceRequest, setTimeUpdated]
const patchApproveMiddlewares = [verifyToken, approveServicesRequest, setTimeUpdated]
const patchRejectMiddlewares = [verifyToken, rejectServicesRequest, setTimeUpdated]
const patchSoftDeleteMiddlewares = [verifyToken, softDeleteServicesRequest, setTimeUpdated]
//routes
servicesRequestRouter.post("/", postMiddlewares, servicesRequestPostController);
servicesRequestRouter.get("/", getMiddlewares, servicesRequestGetController);
servicesRequestRouter.get("/:id", getMiddlewares, servicesRequestGetOneController);
servicesRequestRouter.patch("/approve/:id", patchApproveMiddlewares, servicesRequestPatchController);
servicesRequestRouter.patch("/reject/:id", patchRejectMiddlewares, servicesRequestPatchController);
servicesRequestRouter.patch("/delete/:id", patchSoftDeleteMiddlewares, servicesRequestPatchController);
servicesRequestRouter.delete("/:id", patchSoftDeleteMiddlewares, servicesRequestDeleteOneController);

export default servicesRequestRouter;