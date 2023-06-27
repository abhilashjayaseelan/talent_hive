 import { EmployerRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/employerRepositoryMongoDB";
 import { CreateEmployerInterface, EmployerInterface } from "../../types/employerInterface";

 export const employerDbRepository = (
    repository: ReturnType<EmployerRepositoryMongoDB>
 ) => {
    const getEmployerByEmail = async (email: string) => {
        return await repository.getEmployerByEmail(email);
    }

    const createEmployer = async (employer: CreateEmployerInterface) => {
        return await repository.createEmployer(employer);
    }

    const findEmployerById = async (id: string) => {
        const employer = await repository.getEmployerById(id);
        return employer;
    }

    const updateEmployer = async (employerId: string, updates: Partial<EmployerInterface> ) => {
        const employer  = await repository.updateEmployer(employerId, updates);
        return employer;
    }

    return {
        getEmployerByEmail,
        createEmployer,
        findEmployerById,
        updateEmployer
    }
 }

 export type EmployerDbInterface = typeof employerDbRepository;