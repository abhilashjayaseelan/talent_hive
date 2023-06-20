import { HttpStatus } from "../../../types/httpStatus";
import { CreateUserInterface } from "../../../types/userInterface";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { GoogleAuthServiceInterface } from "../../services/googleAuthServiceInterface";

// creating a new user
export const registerUser = async (
  user: CreateUserInterface,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  user.email = user.email.toLowerCase();
  const isExistingEmail = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    throw new AppError("email already exists", HttpStatus.CONFLICT);
  }
  user.password = await authService.encryptPassword(user.password ?? "");
  const result = await userRepository.createUser(user);
  return result;
};

// user login
export const userLogin = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new AppError("this user does not exist", HttpStatus.UNAUTHORIZED);
  }
  if (user.isGoogleUser) {
    throw new AppError("this user is unauthorized", HttpStatus.UNAUTHORIZED);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    user.password ?? ""
  );
  if (!isPasswordCorrect) {
    throw new AppError("Sorry, incorrect password", HttpStatus.UNAUTHORIZED);
  }
  const token = authService.generateToken(user._id.toString());
  return token;
};

// login with google
export const signInWithGoogle = async (
  credential: string,
  googleAuthService: ReturnType<GoogleAuthServiceInterface>,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user = await googleAuthService.verify(credential);
  const isUserExist = await userRepository.getUserByEmail(user.email);
  if (isUserExist) {
    const payload = isUserExist._id.toString();
    const token = authService.generateToken(payload);
    return token;
  } else {
    const { _id: userId} = await userRepository.createUser(user);
    const payload = userId.toString();
    const token = authService.generateToken(payload);
    return token;
  }
};
