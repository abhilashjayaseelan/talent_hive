import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";
import { UserInterface } from "../../../../types/UserInterface";

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

export const updateUser = async (payload: UserInterface): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: apiConfig.updateUser,
            method: 'put',
            data: payload
        }
        const response = await api(config);
        return response;
    } catch (error) {
        throw new Error('error while updating user');
    }
}