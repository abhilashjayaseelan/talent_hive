export interface LoginPayload {
    email: string,
    password: string
}

export interface SignupPayload extends LoginPayload {
    name: string,
    phone: string,
    confirmPassword: string
}