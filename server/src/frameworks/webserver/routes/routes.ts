import userRouter from "./user";
import authRouter from "./auth";
import { Application } from "express";

const routes = (app: Application) => {
    app.use('/api/user', userRouter());
    app.use('/api/auth', authRouter());
}

export default routes;
