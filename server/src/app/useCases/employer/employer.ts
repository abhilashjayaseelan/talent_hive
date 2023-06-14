import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { EmployerDbInterface } from "../../repositories/employerDbRepository";

export const findEmployerById = (
  id: string,
  dbRepositoryEmployer: ReturnType<EmployerDbInterface>
) => {
    try {
        const employer = dbRepositoryEmployer.findEmployerById(id);
        if(!employer) {
            throw new AppError('No employer found', HttpStatus.UNAUTHORIZED)
        }
    } catch (error: any) {
        throw new Error(error);
    }
};
