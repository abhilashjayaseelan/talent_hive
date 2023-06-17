import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const applyForJob = async (
  jobId: string,
  empId: string
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.applyJob}?jobId=${jobId}&empId=${empId}`,
      method: "post",
    };
    const response = await api(config);
    return response.data;
  } catch (error: any) {
    throw new Error(`failed to create job: ${error.message}`);
  }
};

export const isApplied = async (jobId: string, empId: string): Promise<any> => {
  try {
    if (jobId && empId) {
      const config: AxiosRequestConfig = {
        url: `${apiConfig.isApplied}?jobId=${jobId}&empId=${empId}`,
        method: "get",
      };
      const response = await api(config);
      return response.data;
    }
  } catch (error: any) {
    throw new Error(`failed to check : ${error.message}`);
  }
};
