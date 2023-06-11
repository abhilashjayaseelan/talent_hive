export interface LoginPayload {
    email: string,
    password: string
}

export interface SignupPayload extends LoginPayload {
    name: string,
    phone: string,
    confirmPassword: string
}

export interface EmployerRegisterPayload extends LoginPayload {
    companyName: string,
    industry: string,
    confirmPassword: string,
    location: string,
}

export interface UserDataPayload {
    _id: any,
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