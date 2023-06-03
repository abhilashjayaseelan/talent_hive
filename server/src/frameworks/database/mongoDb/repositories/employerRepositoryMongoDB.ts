import { EmployerInterface, CreateEmployerInterface } from "../../../../types/employerInterface";
import Employer from "../models/employerModel";

export const EmployerRepositoryMongoDB = () =>{

    const getEmployerByEmail = async (email: string) => {
        const employer: EmployerInterface | null = await Employer.findOne({email});
        return employer;
    }

    const createEmployer = async (employer: CreateEmployerInterface) => {
        const newEmployer = await Employer.create(employer);
        return newEmployer;
    }

    return {
        getEmployerByEmail,
        createEmployer
    }
}

export type EmployerRepositoryMongoDB = typeof EmployerRepositoryMongoDB;