import { JobApplicationInterface } from "../../../../types/jobApplicationInterface";
import { JobApplicationEntity } from "../../../../entities/JobApplicationEntity";
import { JobApplicationModel } from "../models/jobApplicationModel";

export const JobApplicationRepositoryMongoDB = (model: JobApplicationModel) => {
    const jobApplicationEntity = new JobApplicationEntity(model)

    const applyForJob = async (application: JobApplicationInterface) => {
        const newApplication = await jobApplicationEntity.applyForJob(application);
        return newApplication;
    }

    return {
        applyForJob
    }
}

export type JobApplicationRepositoryMongoDB = typeof JobApplicationRepositoryMongoDB;