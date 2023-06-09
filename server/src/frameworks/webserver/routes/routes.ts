import userRouter from "./user";
import employerRouter from "./employer";
import jobRouter from "./jobs";
import { Application } from "express";

const routes = (app: Application) => {
    app.use('/api/user', userRouter());
    app.use('/api/employer', employerRouter());
    app.use('/api/job', jobRouter());
}

export default routes;
    