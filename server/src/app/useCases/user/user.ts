import { ParsedTsconfig } from "typescript";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { UserInterface } from "../../../types/userInterface";

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
  try {
    const userData = await dbRepositoryUser.getUserDataById(id);
    if (!userData) {
      throw new AppError("user not found", HttpStatus.BAD_REQUEST);
    }
    return userData;
  } catch (error) {
    throw new Error("failed to get the user data");
  }
};

export const updateUser = async (
  userId: string,
  updates: Partial<UserInterface>,
  dbRepositoryUser: ReturnType<UserDbInterface>
) => {
  try {
    const updatedUser = await dbRepositoryUser.updateUser(userId, updates);
    if(!updatedUser) {
      throw new AppError('not found', HttpStatus.BAD_GATEWAY);
    }
  } catch (error) {
    throw new Error("failed to update the user");
  }
};
