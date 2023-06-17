import express from 'express';
import { jobApplicationDbRepository } from '../../../app/repositories/jobApplicationDbRepository';
import { JobApplicationRepositoryMongoDB } from '../../database/mongoDb/repositories/jobApplicationRepositoryMongoDB';
import { JobApplication } from '../../database/mongoDb/models/jobApplicationModel';
import jobApplicationController from '../../../adapters/controllers/jobApplicationController';

const jobApplicationRouter = () => {
    const route = express.Router();

    const controller = jobApplicationController(
        jobApplicationDbRepository,
        JobApplicationRepositoryMongoDB,
        JobApplication
    );

    route.post('/create-application', controller.applyNewJob);
    route.get('/is-applied', controller.existingApplicant);
    route.get('/all-applications', controller.jobApplicationForEmployer);

    return route;
}

export default jobApplicationRouter;