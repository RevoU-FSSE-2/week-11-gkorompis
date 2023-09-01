// lambda.js
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import usersRouter from './router/usersRouter.js';
import authRouter from './router/authRouter.js';
import servicesRouter from './router/servicesRouter.js';
import servicesRequestRouter from './router/servicesRequestRouter.js';
import storageReportRouter from './router/storageReportRouter.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { swaggerOptions } from './utils/openapi.js';
const swaggerDocs = swaggerJSDoc(swaggerOptions);
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/services", servicesRouter);
app.use("/servicesRequest", servicesRequestRouter);
app.use("/storageReports", storageReportRouter);
app.get("/hello", (req, res) => {
    res.json({ message: "How Much Api Routes Week 11 #127" });
});
//for testing
app.listen(5001, () => {
    console.log('server is listening at port 5001 testing #2');
});
export const handler = serverless(app);
