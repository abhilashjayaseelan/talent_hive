import axios, { AxiosRequestConfig } from "axios";
import {
  EmployerRegisterPayload,
  LoginPayload,
} from "../../types/PayloadInterface";
import configKeys from "../../utils/config";

export const employerLogin = async (payload: LoginPayload): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${configKeys.API_URL}employer/login`,
      method: "post",
      data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 401") {
      throw new Error("Incorrect email or password !!");
    } else {
      throw new Error("Login failed, try again later");
    }
  }
};

export const registerEmployer = async (payload: EmployerRegisterPayload) => {
  try {
    const config: AxiosRequestConfig = {
      url: `${configKeys.API_URL}employer/register`,
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
