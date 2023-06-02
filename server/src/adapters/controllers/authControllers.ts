import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../app/services/authServiceInterface";
import { UserDbInterface } from "../../app/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB";
import { userLogin, registerUser } from "../../app/useCases/auth/userAuth";
import { CreateUserInterface } from "../../types/userInterface";

const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const userRegister = expressAsyncHandler(
    async (req: Request, res: Response) => {
      try {
        const user: CreateUserInterface = req.body;
        const token = await registerUser(user, dbRepositoryUser, authService);
        res.json({
          status: "success",
          message: "user registered successfully",
          token,
        });
      } catch (error: any) {
        res.status(error.statusCode).json({
          status: "error",
          error,
        });
      }
    }
  );

  const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      const token = await userLogin(
        email,
        password,
        dbRepositoryUser,
        authService
      );
      res.json({
        status: "success",
        message: "user verified",
        token,
      });
    } catch (error: any) {
      res.status(error.statusCode).json({
        status: "error",
        error,
      });
    }
  });

  return {
    loginUser,
    userRegister,
  };
};

export default authController;
