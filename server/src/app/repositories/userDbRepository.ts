import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/userRepositoryMongoDB";
import { CreateUserInterface } from "../../types/userInterface";

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

  return {
    getUserByEmail,
    createUser,
  };
};

export type UserDbInterface = typeof userDbRepository;
