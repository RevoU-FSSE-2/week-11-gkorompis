import express from 'express';
import { setTimeCreated } from '../middleware/timestamps.js';
import { setTimeUpdated } from '../middleware/timestamps.js';
import { servicesPostController, servicesGetGontroller } from '../controller/servicesController.js';
import { verifyToken } from '../middleware/authentication.js';
import { serviceUnique } from '../middleware/servicesMiddleware.js';
const app = express();
app.use(express.json());
const servicesRouter = express.Router();
//openapi
/**
 * @openapi
 * /services:
 *   post:
 *     tags:
 *       - Services
 *     summary: Register a New Service
 *     description: |
 *       This endpoint allows 'admin' users to register a new service.
 *       Provide details including the service name, service code, and permissions (an array of strings).
 *       Authentication with a valid bearer token is required to access this endpoint.
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceName:
 *                 type: string
 *               serviceCode:
 *                 type: string
 *               permission:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               serviceName: "Nutrigenomic"
 *               serviceCode: "LAB03"
 *               permission:
 *                 - "admin"
 *     responses:
 *       '200':
 *         description: Successful registration of a new service
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
 *               insertedId: "64f241a694701a7f79ce8864"
 *       '400':
 *         description: Bad Request - Invalid service registration request
 *       '403':
 *         description: Forbidden - Unauthorized access to register a new service
 *       '409':
 *         description: Conflict - Service registration conflict, service already exists
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred during registration
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token with 'admin' role to create new services
 */
/**
 * @openapi
 * /services:
 *   get:
 *     summary: Retrieve All Services
 *     tags:
 *       - Services
 *     description: |
 *       Retrieve a list of all services.
 *       Requires authorization with a valid bearer token (JWT).
 *       Query parameters can be used to filter results based on string fields.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Insert your JWT token here.
 *         required: true
 *         schema:
 *         type: string
 *       - in: query
 *         name: serviceName
 *         schema:
 *           type: string
 *         description: Filter services by service name (string)
 *       - in: query
 *         name: serviceCode
 *         schema:
 *           type: string
 *         description: Filter services by service code (string)
 *       - in: query
 *         name: permission
 *         schema:
 *           type: string
 *         description: Filter services by permission (string)
 *     responses:
 *       '200':
 *         description: Successful retrieval of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the service.
 *                   serviceName:
 *                     type: string
 *                     description: The name of the service.
 *                   serviceCode:
 *                     type: string
 *                     description: The code associated with the service.
 *                   permission:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: The permissions assigned to the service.
 *                   createdTime:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the service was created.
 *                   updatedTime:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the service was last updated.
 *             example:
 *               - _id: "64f0eaa9331d3c99b2d510b1"
 *                 serviceName: "Nutrigenomic"
 *                 serviceCode: "LAB03"
 *                 permission: ["admin"]
 *                 createdTime: "2023-08-31T19:31:50.973Z"
 *                 updatedTime: "2023-08-31T19:31:50.973Z"
 *       '400':
 *         description: Bad Request - Invalid request
 *       '500':
 *         description: Internal Server Error - An unexpected error occurred
 *     security:
 *       - bearerAuth: []  # Requires a valid bearer token (JWT) for authorization
 */
//middlewares
const postMiddlewares = [verifyToken, serviceUnique, setTimeCreated, setTimeUpdated];
const getMiddlewares = [verifyToken, setTimeUpdated];
//routes
servicesRouter.post("/", postMiddlewares, servicesPostController);
servicesRouter.get("/", getMiddlewares, servicesGetGontroller);
export default servicesRouter;
