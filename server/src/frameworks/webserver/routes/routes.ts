import authRouter from "./auth";
import employerAuthRouter from "./employerAuth";
import { Application } from "express";

const routes = (app: Application) => {
    app.use('/api/user', authRouter());
    app.use('/api/employer', employerAuthRouter());
}

export default routes;
    