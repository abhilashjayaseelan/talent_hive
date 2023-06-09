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

    const findJobByEmployer = async (employerId : string) => {
        const jobs = await repository.findJobByEmployer(employerId);
        return jobs;
    }

    const findAllJobs = async () => {
        const allJobs = await repository.findAllJobs();
        return allJobs;
    }

    return {
        createJob,
        updateJob,
        deleteJob,
        findJobByEmployer,
        findAllJobs
    }
}

export type JobDbInterface = typeof jobDbRepository; 