import { AuthServiceReturn } from "../../frameworks/services/authService";

export const authServiceInterface = (service: AuthServiceReturn) => {

  const encryptPassword = (password: string) =>
    service.encryptPassword(password);

  const comparePassword = (password: string, hashedPassword: string) =>
    service.comparePassword(password, hashedPassword);

    return {
        encryptPassword,
        comparePassword
    }
};

export type AuthServiceInterface = typeof authServiceInterface;
