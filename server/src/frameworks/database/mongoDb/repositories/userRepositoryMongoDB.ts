import { CreateUserInterface, UserInterface } from "../../../../types/userInterface";
import User from "../models/userModel";

export const UserRepositoryMongoDB = () => {

  // getting the registered user by the email id
  const getUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email });
    return user;
  };

  // adding a new user
  const createUser = async (user: CreateUserInterface)=> {
    const newUser = await User.create(user);
    return newUser;
  }

  return {
    getUserByEmail,
    createUser
  };
};

export type UserRepositoryMongoDB = typeof UserRepositoryMongoDB;
