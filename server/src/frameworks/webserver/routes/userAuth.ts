import express from "express";
import authController from "../../../adapters/controllers/userAuthControllers";
import { userDbRepository } from "../../../app/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepositoryMongoDB";
import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../app/services/authServiceInterface";
import { User } from "../../database/mongoDb/models/userModel";
import {googleAuthService } from "../../services/googleAuthService";
import { googleAuthServiceInterface } from "../../../app/services/googleAuthServiceInterface";

const userAuthRouter = () => {
  const route = express.Router();

  const controller = authController(
    authServiceInterface,
    authService,
    userDbRepository,
    UserRepositoryMongoDB,
    User,
    googleAuthServiceInterface,
    googleAuthService,
  );

  route.post("/register", controller.userRegister);
  route.post("/login", controller.loginUser);
  route.post("/sign-in-with-google", controller.signWithGoogle);

  return route;
};

export default userAuthRouter;
