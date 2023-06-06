import { CreateEmployerInterface } from "../../../../types/employerInterface";
import {EmployerModel} from "../models/employerModel";
import { EmployerEntity } from "../../../../entities/employer";

export const EmployerRepositoryMongoDB = (model: EmployerModel) =>{
    const employerEntity = new EmployerEntity(model);

    const getEmployerByEmail = async (email: string) => {
        const employer = employerEntity.getEmployerByEmail(email);
        return employer;
    }

    const createEmployer = async (employer: CreateEmployerInterface) => {
        const newEmployer = employerEntity.createEmployer(employer);
        return newEmployer;
    }

    return {
        getEmployerByEmail,
        createEmployer
    }
}

export type EmployerRepositoryMongoDB = typeof EmployerRepositoryMongoDB;