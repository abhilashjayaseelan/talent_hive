import express from 'express';
import employerController from '../../../adapters/controllers/employerController';
import { employerDbRepository } from '../../../app/repositories/employerDbRepository';
import { EmployerRepositoryMongoDB } from '../../database/mongoDb/repositories/employerRepositoryMongoDB';
import { Employer } from '../../database/mongoDb/models/employerModel';
import { upload } from '../middleware/multerCloudinary';
import authenticationMiddleware from '../middleware/authenticationMiddleware';


const employerRouter = () => {
    const route = express.Router();

    const controller = employerController(
        employerDbRepository,
        EmployerRepositoryMongoDB,
        Employer
    );

    route.get('/employer-data',authenticationMiddleware, controller.getEmployerById);
    route.put('/update-employer',authenticationMiddleware, upload, controller.updateEmployer);
    route.get('/employer-data/:empId', controller.getEmployerByIdParam);

    return route;
}

export default employerRouter;