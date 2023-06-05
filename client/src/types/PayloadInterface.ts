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