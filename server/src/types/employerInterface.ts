import {Types} from "mongoose";

export interface CreateEmployerInterface {
    companyName?: string,
    industry?: string,
    email?: string,
    location?: string,
    password?: string,
    isActive?: boolean,
    type?: string,
    createdAt?: Date
}

export interface EmployerInterface extends CreateEmployerInterface {
    _id: Types.ObjectId
}