import { HttpStatus } from "../../../types/httpStatus";
import { CreateUserInterface, UserInterface } from "../../../types/userInterface";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";

// creating a new user
export const registerUser = async (  
    user: CreateUserInterface,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    user.email = user.email.toLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if(isExistingEmail) {
        throw new AppError("email already exists", HttpStatus.UNAUTHORIZED);
    }
    user.password = await authService.encryptPassword(user.password ?? '');
    const token = await userRepository.createUser(user);
    //? const { _id : userId}
    //? code for generating the token;
    return token;
}

// user login
export const userLogin = async (
    email: string,
    password: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
) => {
    const user: UserInterface | null = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new AppError("this user does not exist", HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(password, user.password ?? '')
    if (!isPasswordCorrect) {
        throw new AppError("Sorry, incorrect password", HttpStatus.UNAUTHORIZED)
    }
    return user;
}