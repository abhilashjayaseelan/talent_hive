import express from "express";
import employerAuthController from "../../../adapters/controllers/employerAuthController";
import { employerDbRepository } from "../../../app/repositories/employerDbRepository";
import { EmployerRepositoryMongoDB } from "../../database/mongoDb/repositories/employerRepositoryMongoDB";
import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../app/services/authServiceInterface";

const employerAuthRouter = () => {
  const route = express.Router();

  const controller = employerAuthController(
    authServiceInterface,
    authService,
    employerDbRepository,
    EmployerRepositoryMongoDB
  );

  route.post("/register", controller.employerRegister);
  route.post("/login", controller.loginEmployer);

  return route;
};

export default employerAuthRouter;