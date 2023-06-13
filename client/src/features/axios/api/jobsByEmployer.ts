import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../interceptors/axiosInterceptor";
import apiConfig from "../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const employerJobs = async(): Promise<any> => {
    try {
        const config : AxiosRequestConfig = {
            url: apiConfig.employerJObs,
            method: 'get'
        }
        const response = await api(config);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error('error while getting jobs');
    }
}