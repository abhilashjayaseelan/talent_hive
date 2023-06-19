import express from "express";
import jobController from "../../../adapters/controllers/jobControllers";
import { jobDbRepository } from "../../../app/repositories/jobDbRepository";
import { JobRepositoryMongoDB } from "../../database/mongoDb/repositories/jobRepositoryMongoDB";
import { Job } from "../../database/mongoDb/models/jobModel";


const jobRouter = () => {
    const route = express.Router();

    const controller = jobController(
        jobDbRepository,
        JobRepositoryMongoDB,
        Job
    );

    route.get('/employer-jobs', controller.getJobsByEmployer);
    route.post('/create-job', controller.createNewJob);
    route.put('/update-job/:id', controller.updateTheJob);
    route.delete('/delete-job/:id', controller.deleteTheJob);
    route.get('/all-jobs', controller.findAllJobs);
    route.get('/job-data/:id', controller.jobDataById);
    route.get('/distinct/:field', controller.titleLocationSalary);
    route.post('/filter-jobs', controller.filterJobs);

    return route;
}

export default jobRouter;