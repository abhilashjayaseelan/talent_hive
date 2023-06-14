import { AxiosRequestConfig } from "axios";
import setupAxiosInterceptors from "../interceptors/axiosInterceptor";
import apiConfig from "../../../utils/apiConfig";

const api = setupAxiosInterceptors();

const deleteJob = async (id: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${apiConfig.deleteJob}/${id}`,
      method: "delete",
    };
    await api(config);
  } catch (error) {
    throw new Error("error while deleting the job");
  }
};

export default deleteJob;
