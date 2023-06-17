import { JobApplicationInterface } from "../../../../types/jobApplicationInterface";
import { JobApplicationEntity } from "../../../../entities/JobApplicationEntity";
import { JobApplicationModel } from "../models/jobApplicationModel";
import AppError from "../../../../utils/appError";
import { HttpStatus } from "../../../../types/httpStatus";

export const JobApplicationRepositoryMongoDB = (model: JobApplicationModel) => {
    const jobApplicationEntity = new JobApplicationEntity(model)

    const applyForJob = async (application: JobApplicationInterface) => {
        const newApplication = await jobApplicationEntity.applyForJob(application);
        if(newApplication === null){
            throw new AppError('already applied', HttpStatus.CONFLICT);
        }
        return newApplication;
    }

    const alreadyApplied = async (jobId: string, userId: string) => {
        const alreadyExists = await jobApplicationEntity.isApplied(jobId, userId);
        return alreadyExists;
    }

    const jobApplicationForEmployer = async (employerId: string) => {
        const jobApplications = await jobApplicationEntity.getAllApplicationsForEmployer(employerId);
        return jobApplications;
    }

    return {
        applyForJob,
        alreadyApplied,
        jobApplicationForEmployer
    }
}

export type JobApplicationRepositoryMongoDB = typeof JobApplicationRepositoryMongoDB;