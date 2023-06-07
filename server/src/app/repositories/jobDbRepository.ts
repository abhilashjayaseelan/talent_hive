import { JobRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/jobRepositoryMongoDB";
import { JobInterface } from "../../types/jobInterface";

export const jobDbRepository = (
    repository : ReturnType<JobRepositoryMongoDB>
)=> {
    const createJob = async (job: JobInterface) => {
        const newJob = await repository.createJob(job);
        return newJob;
    }

    const updateJob = async (jobId: string, update: Partial<JobInterface>) => {
        const updatedJob = await repository.updateJob(jobId, update);
        return updatedJob;
    }

    const deleteJob = async (jobId: string) => {
        await repository.deleteJob(jobId);
    }

    return {
        createJob,
        updateJob,
        deleteJob
    }
}

export type JobDbInterface = typeof jobDbRepository;