import express from 'express';
import userController from '../../../adapters/controllers/userControllers';
import { userDbRepository } from '../../../app/repositories/userDbRepository';
import { UserRepositoryMongoDB } from '../../database/mongoDb/repositories/userRepositoryMongoDB';
import { User } from '../../database/mongoDb/models/userModel';
import { upload } from '../middleware/multerCloudinary';

const userRouter = ()=> {
    const route = express.Router();

    const controller = userController(
        userDbRepository,
        UserRepositoryMongoDB,
        User
    );

    route.get('/user-data', controller.getUserDataById);
    route.put('/update-user', upload, controller.updateTheUser);
    route.put('/update-resume', upload, controller.updateTheResume);

    return route;
}

export default userRouter;  