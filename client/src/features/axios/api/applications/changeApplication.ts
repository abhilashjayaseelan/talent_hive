import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptorsEmployer from "../../interceptors/axiosInterceptorEmployer";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptorsEmployer();

export const changeApplicationStatus = async (applicationId: string, status: string) : Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.changeStatus}/${applicationId}`,
            method: 'patch',
            data: {
                status: status
            }
        }
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error('error while changing status of the application')
    }
}