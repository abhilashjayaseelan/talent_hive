import { Request, Response } from "express";
import { CustomRequest } from "../../types/expressRequest";
import { UserDbInterface } from "../../app/repositories/userDbRepository";
import {
  findByEmail,
  findUserDataById,
} from "../../app/useCases/user/findUserByEmail";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB";
import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../../frameworks/database/mongoDb/models/userModel";

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
    async (req: CustomRequest, res: Response) => {
      const id = req.payload ?? "";
      const userData = await findUserDataById(id, dbRepositoryUser);
      res.json(userData);
    }
  );

  return {
    getUserByEmail,
    getUserDataById,
  };
};

export default userController;
