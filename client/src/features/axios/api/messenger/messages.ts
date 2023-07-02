import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import setupAxiosInterceptorsEmployer from "../../interceptors/axiosInterceptorEmployer";   

const userApi = setupAxiosInterceptors();
const empApi = setupAxiosInterceptorsEmployer();

export const getUserMessages = async(conId:string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getMessages}/${conId}`,
            method: 'get'
        }
        const res = await userApi(config);
        return res.data;
    } catch (error) {
        throw new Error('Error while getting user messages');
    }
}

export const postUserMessages = async(message: {}): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getMessages}`,
            method: 'post',
            data: message
        }
        const res = await userApi(config);
        return res.data;
    } catch (error) {
        throw new Error('Error while posting user messages');
    }
}

export const getEmployerMessages = async(conId: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getMessages}/${conId}`,
            method: 'get'
        }
        const res = await empApi(config);
        return res.data;
    } catch (error) {
        throw new Error('Error while getting employer messages');
    }
}

export const postEmployerMessages = async(message: {}): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.getMessages}`,
            method: 'post',
            data: message
        }
        const res = await empApi(config);
        return res.data;
    } catch (error) {
        throw new Error('Error while posting employer messages');
    }
}