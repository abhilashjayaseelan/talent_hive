import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptorsEmployer from "../../interceptors/axiosInterceptorEmployer";

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
  