import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB";
import { CreateUserInterface, UserInterface } from "../../types/userInterface";

export const userDbRepository = (
  repository: ReturnType<UserRepositoryMongoDB>
) => {
  // getting user by email id
  const getUserByEmail = async (email: string) => {
    return await repository.getUserByEmail(email);
  };

  // creating new user
  const createUser = async (user: CreateUserInterface) => {
    return await repository.createUser(user);
  };

  const getUserDataById = async (id: string) => {
    const userData = await repository.getUserDataById(id);
    return userData;
  }

  const updateUser = async (userId: string, updates: Partial<UserInterface>)=> {
    const updatedUser = await repository.updateUser(userId, updates);
    return updateUser;
  }

  return {
    getUserByEmail,
    createUser,
    getUserDataById,
    updateUser,
  };
};

export type UserDbInterface = typeof userDbRepository;
