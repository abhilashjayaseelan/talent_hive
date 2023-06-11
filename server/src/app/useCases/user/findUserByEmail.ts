import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const findByEmail = async (
  email: string,
  dbRepositoryUser: ReturnType<UserDbInterface>
) => {
  try {
    const user = await dbRepositoryUser.getUserByEmail(email);
    if (!user) {
      throw new AppError("user not found", HttpStatus.BAD_REQUEST);
    }
    return user;
  } catch (error) {
    throw new Error("failed to find the user");
  }
};

export const findUserDataById = async (
  id: string,
  dbRepositoryUser: ReturnType<UserDbInterface>
) => {
  const userData = await dbRepositoryUser.getUserDataById(id);
  try {
    if (!userData) {
      throw new AppError("user not found", HttpStatus.BAD_REQUEST);
    }
    return userData;
  } catch (error) {
    throw new Error('failed to get the user data')
  }
};
