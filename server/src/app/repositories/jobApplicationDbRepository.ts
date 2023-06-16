import { JobApplicationRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/jobApplicationRepositoryMongoDB";
import { JobApplicationInterface } from "../../types/jobApplicationInterface";

export const jobApplicationDbRepository = (
    repository: ReturnType<JobApplicationRepositoryMongoDB>
) => {
    const applyForJob = async (application: JobApplicationInterface) => {
        const newApplication = await repository.applyForJob(application);
        return newApplication;
    }

    return {
        applyForJob
    }
}

export type JobApplicationDbInterface = typeof jobApplicationDbRepository;