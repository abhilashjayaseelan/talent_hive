import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const jobDetails = async(jobId: string): Promise<any> => {
    try {
        const config : AxiosRequestConfig = {
            url: `${apiConfig.jobData}/${jobId}`,
            method: 'get',
        }
        const response = await api(config);
        return response?.data.jobData;   
    } catch (error) {
        throw new Error('error while getting job data');    
    }
}

export const allJobs = async (): Promise<any> => {
    try {
        const config : AxiosRequestConfig = {
            url: apiConfig.allJobs,
            method: 'get'
        }
        const response = await api(config);
        return response?.data;
    } catch (error) {
        throw new Error('error while getting all jobs');
    }
}

export const distinctTitleLocationSalary = async(field: string, setter: any): Promise<any> => {
    try {
        const config : AxiosRequestConfig = {
            url: `${apiConfig.titleLocationSalary}/${field}`,
            method: 'get'
        }
        const response = await api(config);
        setter(response.data.distinct);
    } catch (error) {
        throw new Error('error while getting the distinct values');
    }
} 

export const filterJobs = async(role: string, location: string, salary: any): Promise<any> => {
    try {
        const config : AxiosRequestConfig = {
            url: `${apiConfig.filterJobs}`,
            method: 'post',
            data: {
                role,
                location,
                salary
            }
        }
        const response = await api(config);
        return response.data.jobs;
    } catch (error) {
       throw new Error('error while getting jobs'); 
    }
}