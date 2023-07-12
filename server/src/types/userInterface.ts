import { Types } from "mongoose"
export interface UserInterface {
    _id?: Types.ObjectId,
    name?: string,
    email?: string,
    phone?: number,
    password?: string,
    isGoogleUser?: boolean,
    isActive?: boolean,
    education?: Array<object>,
    skills?: Array<string>,
    createdAt?: Date,
    image?: string,
    about?: string,
    resume?: string,
    profession?: string,
    location?: string,
    experience?: object
}

export interface CreateUserInterface {
    name: string,
    email: string,
    phone?: number,
    password?: string,
    isGoogleUser?: boolean,
    isActive?: boolean,
    createdAt?: Date
}