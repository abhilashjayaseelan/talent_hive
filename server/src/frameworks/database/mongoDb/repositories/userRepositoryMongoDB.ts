import { CreateUserInterface, UserInterface } from "../../../../types/userInterface";
import { UserEntity } from "../../../../entities/UserEntity";
import {UserModel} from "../models/userModel";

export const UserRepositoryMongoDB = (model: UserModel) => {
  const userEntity = new UserEntity(model);

  // getting the registered user by the email id
  const getUserByEmail = async (email: string) => {
    const user = await userEntity.getUserByEmail(email);
    return user;
  };

  // adding a new user
  const createUser = async (user: CreateUserInterface)=> {
    const newUser = await userEntity.creteUser(user);
    return newUser;
  }

  const getUserDataById = async (id: string) => {
    const userData = await userEntity.getUserDataById(id);
    return userData;
  }

  const updateUser = async (userId: string, updates: Partial<UserInterface>) => {
    const updatedUser = await userEntity.updateUser(userId, updates);
    return updatedUser;
  }

  const deleteResume = async (userId: string) => {
    await userEntity.resumeDelete(userId);
  }

  return {
    getUserByEmail,
    createUser,
    getUserDataById,
    updateUser,
    deleteResume
  };
};

export type UserRepositoryMongoDB = typeof UserRepositoryMongoDB;
