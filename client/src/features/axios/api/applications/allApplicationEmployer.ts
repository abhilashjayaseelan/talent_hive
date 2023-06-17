import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptorsEmployer from "../../interceptors/axiosInterceptorEmployer";

const api = setupAxiosInterceptorsEmployer();

export const allApplications = async (): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: apiConfig.allApplication,
            method: 'get'
        }
        const applications = await api(config);
        return applications.data;
    } catch (error) {
        throw new Error('error while getting applications');
    }
}

