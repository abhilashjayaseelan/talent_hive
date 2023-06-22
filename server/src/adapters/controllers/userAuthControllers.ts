import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../app/services/authServiceInterface";
import { UserDbInterface } from "../../app/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB";
import { userLogin, registerUser, signInWithGoogle } from "../../app/useCases/auth/userAuth";
import { CreateUserInterface, UserInterface } from "../../types/userInterface";
import { UserModel } from "../../frameworks/database/mongoDb/models/userModel";
import { GoogleAuthService } from "../../frameworks/services/googleAuthService";
import { GoogleAuthServiceInterface } from "../../app/services/googleAuthServiceInterface";

const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  userModel: UserModel,
  googleAuthServiceInterface: GoogleAuthServiceInterface,
  googleAuthServiceImpl: GoogleAuthService
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl(userModel));
  const authService = authServiceInterface(authServiceImpl());
  const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());

  const userRegister = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const user: CreateUserInterface = req?.body;
      await registerUser(user, dbRepositoryUser, authService);
      res.json({
        status: "success",
        message: "user registered successfully",
      });
    }
  );

  const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
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
  });

  const signWithGoogle = expressAsyncHandler(async (req: Request, res: Response) => {
    const {credential} : {credential: string} = req.body;
    const token = await signInWithGoogle(credential, googleAuthService, dbRepositoryUser, authService);
    res.json({
      status: "success",
      message: "user verified",
      token
    })
  }) 

  return {
    loginUser,
    userRegister,
    signWithGoogle
  };
};

export default authController;
