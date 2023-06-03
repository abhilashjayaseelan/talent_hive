import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configKeys from "../../config";

export const authService = () => {
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  };

  const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };

  const generateToken = (payload: string) => {
    const token = jwt.sign({ payload }, configKeys.JWT_KEY, {
      expiresIn: "5d",
    });
    return token;
  };

  const verifyToken = (token: string) => {
    return jwt.verify(token, configKeys.JWT_KEY);
  };

  return {
    encryptPassword,
    comparePassword,
    generateToken,
    verifyToken
  };
};

export type AuthService = typeof authService;

export type AuthServiceReturn = ReturnType<AuthService>;
