import { JobApplicationRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/jobApplicationRepositoryMongoDB";
import { JobApplicationInterface } from "../../types/jobApplicationInterface";

export const jobApplicationDbRepository = (
    repository: ReturnType<JobApplicationRepositoryMongoDB>
) => {
    const applyForJob = async (application: JobApplicationInterface) => {
        const newApplication = await repository.applyForJob(application);
        return newApplication;
    }

    const alreadyApplied = async (jobId: string, userId: string) => {
        const existingApplication = await repository.alreadyApplied(jobId, userId);
        return existingApplication;
    }

    const jobApplicationsForEmployer = async (employerId: string) => {
        const applications = await repository.jobApplicationForEmployer(employerId);
        return applications;
    }

    return {
        applyForJob,
        alreadyApplied,
        jobApplicationsForEmployer
    }
}

export type JobApplicationDbInterface = typeof jobApplicationDbRepository;