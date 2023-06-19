import { HttpStatus } from "../../../types/httpStatus";
import { JobInterface } from "../../../types/jobInterface";
import AppError from "../../../utils/appError";
import { JobDbInterface } from "../../repositories/jobDbRepository";

export const createJob = async (
  job: JobInterface,
  jobRepository: ReturnType<JobDbInterface>
) => {
  try {
    const result = await jobRepository.createJob(job);
    return result;
  } catch (error: any) {
    console.log(error)
    throw new Error("Failed to create job")
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

export const findJobByEmployer = async (
  employerId: string,
  jobRepository: ReturnType<JobDbInterface>
) => {
  try {
    const jobs = await jobRepository.findJobByEmployer(employerId);
    return jobs;
  } catch (error) {
    throw new Error("failed to find the jobs");
  }
};

export const getAllJobs = async (
  jobRepository: ReturnType<JobDbInterface>
) => {
  try {
    const allJobs = await jobRepository.findAllJobs();
    return allJobs;
  } catch (error) {
    throw new Error("failed to get the jobs")
  }
}

export const findJobById = async (
  jobId: string,
  jobRepository: ReturnType<JobDbInterface>
) => {
  try {
    const jobData = await jobRepository.getJobById(jobId);
    return jobData;
  } catch (error: any) {
    throw new Error('failed to get the job data')
  }
}

export const distinctTitleLocationSalary = async (
  title: string,
  jobRepository: ReturnType<JobDbInterface>
) => {
  try {
    const distinct = await jobRepository.titleLocationSalary(title);
    return distinct;
  } catch (error) {
    throw new AppError('could not find any values', HttpStatus.SERVICE_UNAVAILABLE);
  }
}

export const filterTheJobs = async (
  role: string,
  location: string,
  salary: any,
  jobRepository: ReturnType<JobDbInterface>
) => {
  try {
    const jobs = await jobRepository.filterJob(role, location, salary);
    return jobs;
  } catch (error) {
    throw new AppError('could not find any results', HttpStatus.NOT_FOUND);
  }
}