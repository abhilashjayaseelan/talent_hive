import userAuthRouter from "./userAuth";
import employerAuthRouter from "./employerAuth";
import jobRouter from "./jobs";
import { Application } from "express";
import userRouter from "./user";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import employerRouter from "./employer";
import jobApplicationRouter from "./jobApplication";
import conversationRouter from "./conversation";
import messageRouter  from "./message";

const routes = (app: Application) => {
    app.use('/api/user',authenticationMiddleware, userRouter());
    app.use('/api/employer',authenticationMiddleware, employerRouter());
    app.use('/api/user-auth', userAuthRouter());
    app.use('/api/employer-auth', employerAuthRouter());
    app.use('/api/job', authenticationMiddleware, jobRouter());
    app.use('/api/job-application',authenticationMiddleware, jobApplicationRouter());
    app.use('/api/messenger-conversation', authenticationMiddleware, conversationRouter());
    app.use('/api/messenger-message', authenticationMiddleware, messageRouter());
}

export default routes;
    