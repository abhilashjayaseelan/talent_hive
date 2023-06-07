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

    return {
        createJob,
        updateJob,
        deleteJob,
    }
}

export type JobRepositoryMongoDB = typeof JobRepositoryMongoDB;