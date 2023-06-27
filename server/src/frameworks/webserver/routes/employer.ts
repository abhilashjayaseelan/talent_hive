import express from 'express';
import employerController from '../../../adapters/controllers/employerController';
import { employerDbRepository } from '../../../app/repositories/employerDbRepository';
import { EmployerRepositoryMongoDB } from '../../database/mongoDb/repositories/employerRepositoryMongoDB';
import { Employer } from '../../database/mongoDb/models/employerModel';
import { upload } from '../middleware/multerCloudinary';


const employerRouter = () => {
    const route = express.Router();

    const controller = employerController(
        employerDbRepository,
        EmployerRepositoryMongoDB,
        Employer
    );

    route.get('/employer-data', controller.getEmployerById);
    route.put('/update-employer',upload, controller.updateEmployer);

    return route;
}

export default employerRouter;