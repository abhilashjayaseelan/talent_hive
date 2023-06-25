import { JobApplicationInterface } from "../../../../types/jobApplicationInterface";
import { JobApplicationEntity } from "../../../../entities/JobApplicationEntity";
import { JobApplicationModel } from "../models/jobApplicationModel";
import AppError from "../../../../utils/appError";
import { HttpStatus } from "../../../../types/httpStatus";
import { Types } from "mongoose";

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

    const jobApplicationDetails = async (jobId: Types.ObjectId) => {
        const applicationDetails = await jobApplicationEntity.getApplicationDetails(jobId);
        return applicationDetails;
    }

    const changeApplicationStatus = async (jobId: Types.ObjectId, status: string) => {
        const updatedApplication = await jobApplicationEntity.changeStatusOfApplication(jobId, status);
        return jobApplicationDetails;
    }

    const userApplications = async (userId: Types.ObjectId) => {
        const jobApplications = await jobApplicationEntity.getAllApplicationByUser(userId);
        return jobApplications;
    }

    return {
        applyForJob,
        alreadyApplied,
        jobApplicationForEmployer,
        jobApplicationDetails,
        changeApplicationStatus,
        userApplications
    }
}

export type JobApplicationRepositoryMongoDB = typeof JobApplicationRepositoryMongoDB;