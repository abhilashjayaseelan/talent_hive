export interface UserInterface {
    _id?: string,
    name: string,
    email: string,
    phone: number,
    password?: string,
    isGoogleUser?: boolean,
    isActive?: boolean,
    education?: Array<object>,
    skills?: Array<string>,
    createdAt?: Date
}

export interface CreateUserInterface {
    name: string,
    email: string,
    phone: number,
    password?: string,
    isGoogleUser?: boolean,
    isActive?: boolean,
    createdAt?: Date
}