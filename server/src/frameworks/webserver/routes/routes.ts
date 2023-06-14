import userAuthRouter from "./userAuth";
import employerAuthRouter from "./employerAuth";
import jobRouter from "./jobs";
import { Application } from "express";
import userRouter from "./user";
import authenticationMiddleware from "../middleware/authenticationMiddleware";
import employerRouter from "./employer";

const routes = (app: Application) => {
    app.use('/api/user',authenticationMiddleware, userRouter());
    app.use('/api/employer',authenticationMiddleware, employerRouter());
    app.use('/api/user-auth', userAuthRouter());
    app.use('/api/employer-auth', employerAuthRouter());
    app.use('/api/job', jobRouter());
}

export default routes;
    