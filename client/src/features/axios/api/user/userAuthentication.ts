import axios, { AxiosRequestConfig } from "axios";
import {
  LoginPayload,
  SignupPayload,
} from "../../../../types/PayloadInterface";
import apiConfig from "../../../../utils/apiConfig";

export const registerUser = async (payload: SignupPayload): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.userRegister}`,
      method: "post",
      data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 409") {
      throw new Error("Email already exists !!!");
    } else {
      throw new Error("Signup failed, try again");
    }
  }
};

export const userLogin = async (payload: LoginPayload): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.userLogin}`,
      method: "post",
      data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 401") {
      throw new Error("Incorrect email or password !!!");
    } else {
      throw new Error("Login failed, try again");
    }
  }
};

export const googleLogin = async (payload: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.googleSignIN}`,
      method: "post",
      data: {credential: payload},
    };
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    throw new Error('Login failed, try again');
  }
};
