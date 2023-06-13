import { CreateEmployerInterface } from "../../../../types/employerInterface";
import {EmployerModel} from "../models/employerModel";
import { EmployerEntity } from "../../../../entities/EmployerEntity";

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

    const getEmployerById = async (id: string) => {
        const employer = employerEntity.getEmployerById(id);
        return employer;
    }

    return {
        getEmployerByEmail,
        createEmployer,
        getEmployerById
    }
}

export type EmployerRepositoryMongoDB = typeof EmployerRepositoryMongoDB;