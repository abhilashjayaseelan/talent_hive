import express from "express";
import jobController from "../../../adapters/controllers/jobControllers";
import { jobDbRepository } from "../../../app/repositories/jobDbRepository";
import { JobRepositoryMongoDB } from "../../database/mongoDb/repositories/jobRepositoryMongoDB";
import { Job } from "../../database/mongoDb/models/jobModel";
import authenticationMiddleware from "../middleware/authenticationMiddleware";


const jobRouter = () => {
    const route = express.Router();

    const controller = jobController(
        jobDbRepository,
        JobRepositoryMongoDB,
        Job
    )

    route.post('/create-job', authenticationMiddleware, controller.createNewJob);
    route.put('/update-job/:id', authenticationMiddleware, controller.updateTheJob);
    route.delete('/delete-job/:id', authenticationMiddleware, controller.deleteTheJob);

    return route;
}

export default jobRouter;