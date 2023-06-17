import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptorsEmployer from "../../interceptors/axiosInterceptorEmployer";

const api = setupAxiosInterceptorsEmployer();

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
