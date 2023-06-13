import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../interceptors/axiosInterceptor";
import apiConfig from "../../../utils/apiConfig";
import { JobCreationPayload } from "../../../types/PayloadInterface";

const api = setupAxiosInterceptors();

const updateJob = async (
  payload: JobCreationPayload,
  jobId: string
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.updateJob}/${jobId}`,
      method: "post",
      data: payload
    };
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw new Error("error while creating new job");
  }
};

export default updateJob;
