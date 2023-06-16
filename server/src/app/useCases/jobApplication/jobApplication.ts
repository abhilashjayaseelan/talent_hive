import { JobApplicationInterface } from "../../../types/jobApplicationInterface";
import { JobApplicationDbInterface } from "../../repositories/jobApplicationDbRepository";

export const applyForJob = (
    application: JobApplicationInterface,
    jobApplicationDbRepository: ReturnType<JobApplicationDbInterface>
) => {
    try {
        const result = jobApplicationDbRepository.applyForJob(application);
        return result;
    } catch (error: any) {
        throw new Error(`failed to apply for the job.  ${error.message}`)
    }
}