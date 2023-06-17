import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const userData = async (): Promise <any> => {
    try {
        const config : AxiosRequestConfig = {
            url: apiConfig.userData,
            method: 'get',
        }
        const response = await api(config);
        return response.data;   
    } catch (error) {
        throw new Error('error while getting user data');    
    }
}