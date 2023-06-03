import axios, { AxiosRequestConfig } from "axios";
import { LoginPayload, SignupPayload } from "../../types/PayloadInterface";
import configKeys from "../../utils/config";

export const registerUser = async (payload: SignupPayload): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${configKeys.API_URL}auth/user-register`,
      method: "post",
      data: payload,
    };
    const response = await axios(config);
    console.log(response)
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
      url: `${configKeys.API_URL}auth/user-login`,
      method: "post",
      data: payload,
    };
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.message === "Request failed with status code 401") {
      throw new Error("Email or password error !!!");
    } else {
      throw new Error("Login failed, try again");
    }
  }
};
