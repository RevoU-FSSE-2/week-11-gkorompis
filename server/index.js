// lambda.js
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import usersRouter from './router/usersRouter.js';
import transactionsRequestRouter from './router/transactionsRequestRouter.js';
import authRouter from './router/authRouter.js';
// import transactionsRouter from './routes/transactionsRoutes.js';
// import authRouter from './routes/authRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/transactionsRequest", transactionsRequestRouter);
app.use("/auth", authRouter);
app.get("/hello", (req, res) => {
    res.json({ message: "How Much Api Routes Week 10 #8" });
});
//for testing
app.listen(5001, () => {
    console.log('server is listening at port 5001 testing #2');
});
export const handler = serverless(app);
