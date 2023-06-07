import { JobInterface } from "../../../types/jobInterface";
import { JobDbInterface } from "../../repositories/jobDbRepository";

export const createJob = async (
  job: JobInterface,
  jobRepository: ReturnType<JobDbInterface>
) => {
  try {
    const result = await jobRepository.createJob(job);
    return result;
  } catch (error: any) {
    throw new Error("Failed to create job");
  }
};

export const updateJob = async (
  job: JobInterface,
  jobId: string,
  jobRepository: ReturnType<JobDbInterface>
) => {
  try {
    const updatedJob = await jobRepository.updateJob(jobId, job);
    return updatedJob;
  } catch (error) {
    throw new Error("failed to update the job");
  }
};

export const deleteJob = async (
  jobId: string,
  jobRepository: ReturnType<JobDbInterface>
) => {
  try {
    await jobRepository.deleteJob(jobId);
  } catch (error) {
    throw new Error("failed to delete the job");
  }
};
