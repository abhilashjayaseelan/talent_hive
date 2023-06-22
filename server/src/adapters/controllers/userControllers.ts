import { Request, Response } from "express";
import { CustomRequest } from "../../types/expressRequest";
import { UserDbInterface } from "../../app/repositories/userDbRepository";
import {
  findByEmail,
  findUserDataById,
} from "../../app/useCases/user/user";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB";
import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../../frameworks/database/mongoDb/models/userModel";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";

const userController = (
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  userModel: UserModel
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl(userModel));

  const getUserByEmail = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const { email } = req.body;
      const user = await findByEmail(email, dbRepositoryUser);
      res.json(user);
    }
  );

  const getUserDataById = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const id = customReq.payload ?? "";
      const userData = await findUserDataById(id, dbRepositoryUser);
      res.json(userData);
    }
  );

  const updateTheUser = expressAsyncHandler(
    async(req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const id = customReq.payload ?? '';
      if (!id) {
        throw new AppError('Unauthorized request.. invalid token', HttpStatus.UNAUTHORIZED);
      }
      console.log(req.body);
      console.log(req.files)
      // const updates =  
    }
  )

  return {
    getUserByEmail,
    getUserDataById,
    updateTheUser
  };
};

export default userController;
