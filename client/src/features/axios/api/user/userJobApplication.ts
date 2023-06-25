import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const userAllApplications = async(): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: apiConfig.allUserApplications,
            method: 'get'
        }
        const response = await api(config);
        return response?.data;
    } catch (error) {
        throw new Error('Error while getting applications')
    }
};


export const applicationDetails = async(applicationId: string) : Promise<any> => {
    try {
        const config : AxiosRequestConfig = {
            url: `${apiConfig.applicationDetails}/${applicationId}`,
            method: 'get',
        }
        const response = await api(config);
        return response?.data?.applicationData;   
    } catch (error) {
        throw new Error('error while getting the application data');
    }
}