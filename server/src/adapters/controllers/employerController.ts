import { Response } from "express";
import { CustomRequest } from "../../types/expressRequest";
import { EmployerDbInterface } from "../../app/repositories/employerDbRepository";
import { EmployerRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/employerRepositoryMongoDB";
import expressAsyncHandler from "express-async-handler";
import { EmployerModel } from "../../frameworks/database/mongoDb/models/employerModel";

const employerController = (
  employerDbRepository: EmployerDbInterface,
  employerDbRepositoryImpl: EmployerRepositoryMongoDB,
  employerModel: EmployerModel
) => {
  const dbRepositoryEmployer = employerDbRepository(employerDbRepositoryImpl(employerModel));

  const getEmployerById = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
        const id = req.payload ?? '' ; 
        const employerData = await dbRepositoryEmployer.findEmployerById(id);
        res.json({status: 'success', employerData});
    }
  );

  return {
    getEmployerById
  }
};

export default employerController;