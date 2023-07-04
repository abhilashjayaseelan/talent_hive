import { Request, Response } from "express";
import { CustomRequest } from "../../types/expressRequest";
import { UserDbInterface } from "../../app/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB";
import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../../frameworks/database/mongoDb/models/userModel";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";
import { UserInterface } from "../../types/userInterface";
import {
  findByEmail,
  findUserDataById,
  updateUser,
  updateResume,
  deleteResume
} from "../../app/useCases/user/user";

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

  // get user by toke id
  const getUserDataById = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const id = customReq.payload ?? "";
      const userData = await findUserDataById(id, dbRepositoryUser);
      res.json(userData);
    }
  );
  // by id in param
  const getUserDataByIdParam = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params?.userId ?? "";
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
      const update:UserInterface = req.body;
      if(req?.file?.path) {
        update.image = req?.file?.path;
      }

      const updateUserProfile = await updateUser(id, update, dbRepositoryUser);

      res.json({
        status: 'success',
        updateUserProfile
      });
    }
  )

  const updateTheResume = expressAsyncHandler(
    async(req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const id = customReq.payload ?? '';
      if (!id) {
        throw new AppError('Unauthorized request.. invalid token', HttpStatus.UNAUTHORIZED);
      }
      const update:UserInterface = {}
      update.resume = req?.file?.path;

      const updateUserResume = await updateResume(id, update, dbRepositoryUser);
      
      res.json({
        status: 'success',
        updateUserResume
      });
    }
  )

  const userDeleteResume = expressAsyncHandler(
    async(req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const id = customReq.payload ?? '' ;
      if (!id) {
        throw new AppError('Unauthorized request invalid token', HttpStatus.UNAUTHORIZED);
      }
      await deleteResume(id, dbRepositoryUser);
      res.json({
        status: 'success',
        message: 'resume deleted successfully'
      })
    }
  )

  

  return {
    getUserByEmail,
    getUserDataById,
    updateTheUser,
    updateTheResume,
    userDeleteResume,
    getUserDataByIdParam
  };
};

export default userController;
