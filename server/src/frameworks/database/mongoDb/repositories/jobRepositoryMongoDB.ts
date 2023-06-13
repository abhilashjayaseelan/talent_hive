import { JobInterface } from "../../../../types/jobInterface";
import { JobEntity } from "../../../../entities/JobEntity";
import { JobModel } from "../models/jobModel";

export const JobRepositoryMongoDB = (model: JobModel) => {
    const jobEntity = new JobEntity(model)

    const createJob = async (job: JobInterface) => {
        const newJob = await jobEntity.createJob(job);
        return newJob;
    }

    const updateJob = async (jobId: string, updates: Partial<JobInterface>) => {
        const updatedJob = await jobEntity.updateJob(jobId, updates);
        return updatedJob;
    }

    const deleteJob = async (jobId: string) => {
        await jobEntity.deleteJob(jobId);
    }

    const findJobByEmployer = async (employerId : string) => {
        const jobs = await jobEntity.getJobByEmployer(employerId);
        return jobs;
    }

    const findAllJobs = async () => {
        const allJobs = await jobEntity.getAllJobs();
        return allJobs;
    }

    const findJobById = async (id: string) => {
        const jobData = await jobEntity.getJobById(id);
        return jobData;
    }

    return {
        createJob,
        updateJob,
        deleteJob,
        findJobByEmployer,
        findAllJobs,
        findJobById
    }
}

export type JobRepositoryMongoDB = typeof JobRepositoryMongoDB;