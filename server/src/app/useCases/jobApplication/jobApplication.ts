import { error } from "console";
import { JobApplicationInterface } from "../../../types/jobApplicationInterface";
import { JobApplicationDbInterface } from "../../repositories/jobApplicationDbRepository";
import { Types } from "mongoose";

export const applyForJob = (
  application: JobApplicationInterface,
  jobApplicationDbRepository: ReturnType<JobApplicationDbInterface>
) => {
  try {
    const result = jobApplicationDbRepository.applyForJob(application);
    if (result === null) {
      throw new Error(`already applied for the job. ${error}`);
    }
    return result;
  } catch (error: any) {
    throw new Error(`failed to apply for the job.  ${error.message}`);
  }
};

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
};

export const allApplications = (
  employerId: string,
  jobApplicationDbRepository: ReturnType<JobApplicationDbInterface>
) => {
  try {
    const applications =
      jobApplicationDbRepository.jobApplicationsForEmployer(employerId);
    return applications;
  } catch (error: any) {
    throw new Error(`failed to get applications ${error.message}`);
  }
};

export const getApplicationDetails = (
  jobId: Types.ObjectId,
  jobApplicationDbRepository: ReturnType<JobApplicationDbInterface>
) => {
  try {
    const details = jobApplicationDbRepository.jobApplicationDetails(jobId);
    return details;
  } catch (error: any) {
    throw new Error(`failed to get application details ${error.message}`);
  }
};

