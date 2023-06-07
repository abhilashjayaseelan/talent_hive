import authRouter from "./userAuth";
import employerAuthRouter from "./employerAuth";
import jobRouter from "./jobs";
import { Application } from "express";

const routes = (app: Application) => {
    app.use('/api/user', authRouter());
    app.use('/api/employer', employerAuthRouter());
    app.use('/api/job', jobRouter());
}

export default routes;
    