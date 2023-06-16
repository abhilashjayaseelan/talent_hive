import { error } from "console";
import { JobApplicationInterface } from "../../../types/jobApplicationInterface";
import { JobApplicationDbInterface } from "../../repositories/jobApplicationDbRepository";

export const applyForJob = (
    application: JobApplicationInterface,
    jobApplicationDbRepository: ReturnType<JobApplicationDbInterface>
) => {
    try {
        const result = jobApplicationDbRepository.applyForJob(application);
        if(result === null) {
            throw new Error(`already applied for the job. ${error}`)
        }
        return result;
    } catch (error: any) {
        throw new Error(`failed to apply for the job.  ${error.message}`);
    }
}

export const existingApplication = (
    jobId: any,
    userId: any,
    jobApplicationDbRepository: ReturnType<JobApplicationDbInterface>
) => {
    try {
        const result = jobApplicationDbRepository.alreadyApplied(jobId, userId);
        return result;
    } catch (error: any) {
        throw new Error(`failed to get details ${error.message}`);
    }
}