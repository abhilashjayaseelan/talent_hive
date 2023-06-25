import { Types } from "mongoose";
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

    const jobApplicationDetails = async (jobId: Types.ObjectId) => {
        const details = await repository.jobApplicationDetails(jobId);
        return details;
    }

    const changeApplicationStatus = async (jobId: Types.ObjectId, status: string) => {
        const updatedApplication = await repository.changeApplicationStatus(jobId, status);
        return updatedApplication;
    }

    const userApplications = async (userId: Types.ObjectId) => {
        const jobApplications = await repository.userApplications(userId);
        return jobApplications;
    }

    return {
        applyForJob,
        alreadyApplied,
        jobApplicationsForEmployer,
        jobApplicationDetails,
        changeApplicationStatus,
        userApplications
    }
}

export type JobApplicationDbInterface = typeof jobApplicationDbRepository;