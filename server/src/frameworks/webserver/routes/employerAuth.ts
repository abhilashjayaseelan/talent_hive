import express from "express";
import employerAuthController from "../../../adapters/controllers/employerAuthController";
import { employerDbRepository } from "../../../app/repositories/employerDbRepository";
import { EmployerRepositoryMongoDB } from "../../database/mongoDb/repositories/employerRepositoryMongoDB";
import { authService } from "../../services/authService";
import { authServiceInterface } from "../../../app/services/authServiceInterface";
import {Employer} from "../../database/mongoDb/models/employerModel";

const employerAuthRouter = () => {
  const route = express.Router();

  const controller = employerAuthController(
    authServiceInterface,
    authService,
    employerDbRepository,
    EmployerRepositoryMongoDB,
    Employer
  );

  route.post("/register", controller.employerRegister);
  route.post("/login", controller.loginEmployer);

  return route;
};

export default employerAuthRouter;