import express from 'express';
import userController from '../../../adapters/controllers/userControllers';
import { userDbRepository } from '../../../app/repositories/userDbRepository';
import { UserRepositoryMongoDB } from '../../database/mongoDb/repositories/userRepositoryMongoDB';
import { User } from '../../database/mongoDb/models/userModel';

const userRouter = ()=> {
    const route = express.Router();

    const controller = userController(
        userDbRepository,
        UserRepositoryMongoDB,
        User
    );

    route.get('/user-data', controller.getUserDataById);

    return route;
}

export default userRouter;  