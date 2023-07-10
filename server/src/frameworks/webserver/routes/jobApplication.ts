import express from 'express';
import { jobApplicationDbRepository } from '../../../app/repositories/jobApplicationDbRepository';
import { JobApplicationRepositoryMongoDB } from '../../database/mongoDb/repositories/jobApplicationRepositoryMongoDB';
import { JobApplication } from '../../database/mongoDb/models/jobApplicationModel';
import jobApplicationController from '../../../adapters/controllers/jobApplicationController';
import roleMiddleware from "../middleware/roleMiddleware";

const userMiddleware = roleMiddleware('user');
const employerMiddleware = roleMiddleware('employer');

const jobApplicationRouter = () => {
    const route = express.Router();

    const controller = jobApplicationController(
        jobApplicationDbRepository,
        JobApplicationRepositoryMongoDB,
        JobApplication
    );

    route.post('/create-application',userMiddleware, controller.applyNewJob);
    route.get('/is-applied', controller.existingApplicant);
    route.get('/all-applications',employerMiddleware, controller.jobApplicationForEmployer);
    route.get('/applicant-details/:id', controller.jobApplicationDetails);
    route.patch('/change-status/:id',employerMiddleware, controller.changeTheApplicationStatus);
    route.get('/user-applications',userMiddleware, controller.userApplications);

    return route;
}

export default jobApplicationRouter;