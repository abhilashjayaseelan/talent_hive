import { Request, Response } from "express";
import { UserDbInterface } from "../../app/repositories/userDbRepository";
import { findByEmail } from "../../app/useCases/user/findUserByEmail";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB";
import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../../frameworks/database/mongoDb/models/userModel";

const userController = ( userDbRepository: UserDbInterface, userDbRepositoryImpl: UserRepositoryMongoDB, userModel: UserModel) => {
    
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl(userModel));

    const getUserByEmail = expressAsyncHandler(async (req:Request, res: Response) => {
        const {email} = req.body;
        const user = await findByEmail(email, dbRepositoryUser);
        res.json(user);
    })

    return {
        getUserByEmail
    }
}

export default userController;