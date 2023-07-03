import express from 'express';
import userController from '../../../adapters/controllers/userControllers';
import { userDbRepository } from '../../../app/repositories/userDbRepository';
import { UserRepositoryMongoDB } from '../../database/mongoDb/repositories/userRepositoryMongoDB';
import { User } from '../../database/mongoDb/models/userModel';
import { upload } from '../middleware/multerCloudinary';
import authenticationMiddleware from '../middleware/authenticationMiddleware';

const userRouter = ()=> {
    const route = express.Router();

    const controller = userController(
        userDbRepository,
        UserRepositoryMongoDB,
        User
    );

    route.get('/user-data',authenticationMiddleware, controller.getUserDataById);
    route.put('/update-user',authenticationMiddleware, upload, controller.updateTheUser);
    route.put('/update-resume',authenticationMiddleware, upload, controller.updateTheResume);
    route.delete('/delete-resume' ,authenticationMiddleware, controller.userDeleteResume);
    route.get('/user-data/:userId', controller.getUserDataByIdParam);

    return route;
}

export default userRouter;  