import { Request, Response } from "express";
import { CustomRequest } from "../../types/expressRequest";
import { EmployerDbInterface } from "../../app/repositories/employerDbRepository";
import { EmployerRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/employerRepositoryMongoDB";
import expressAsyncHandler from "express-async-handler";
import { EmployerModel } from "../../frameworks/database/mongoDb/models/employerModel";
import { EmployerInterface } from "../../types/employerInterface";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";

const employerController = (
  employerDbRepository: EmployerDbInterface,
  employerDbRepositoryImpl: EmployerRepositoryMongoDB,
  employerModel: EmployerModel
) => {
  const dbRepositoryEmployer = employerDbRepository(
    employerDbRepositoryImpl(employerModel)
  );

  const getEmployerById = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const id = customReq.payload ?? "";
      const employerData = await dbRepositoryEmployer.findEmployerById(id);
      res.json({ status: "success", employerData });
    }
  );

  const updateEmployer = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const employerId = customReq.payload ?? "";
      if (!employerId) {
        throw new AppError(
          "unauthorized request, invalid token",HttpStatus.UNAUTHORIZED
        );
      }
      const updates: EmployerInterface = req.body;
      if (req?.file?.path) {
        updates.image = req?.file?.path;
      }
      const updatedEmployer = await dbRepositoryEmployer.updateEmployer(
        employerId,
        updates
      );

      res.json({
        status: 'success',
        updatedEmployer
      });
    }
  );

  return {
    getEmployerById,
    updateEmployer
  };
};

export default employerController;
