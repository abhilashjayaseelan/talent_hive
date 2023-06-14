 import { EmployerRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/employerRepositoryMongoDB";
 import { CreateEmployerInterface } from "../../types/employerInterface";

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

    return {
        getEmployerByEmail,
        createEmployer,
        findEmployerById
    }
 }

 export type EmployerDbInterface = typeof employerDbRepository;