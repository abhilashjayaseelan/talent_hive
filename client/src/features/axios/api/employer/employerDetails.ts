import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptorsEmployer from "../../interceptors/axiosInterceptorEmployer";
import { EmployerRegisterPayload } from "../../../../types/PayloadInterface";

const api = setupAxiosInterceptorsEmployer();

export const employerData = async (): Promise<any> => {
    try {
        const config : AxiosRequestConfig = {
            url: apiConfig.employerData,
            method: 'get'
        }
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error('error while getting employer data');
    }
}
  

export const updateEmployer = async (payload: EmployerRegisterPayload): Promise<any> => {
    try {
      const config: AxiosRequestConfig = {
        url: apiConfig.updateEmployer,
        method: "put",
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await api(config);
      return response;
    } catch (error) {
      throw new Error("error while updating employer");
    }
  };