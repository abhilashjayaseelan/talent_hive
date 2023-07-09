import { JobApplicationInterface } from "../types/jobApplicationInterface";
import { JobApplicationModel } from "../frameworks/database/mongoDb/models/jobApplicationModel";
import { User } from "../frameworks/database/mongoDb/models/userModel";
import { Job } from "../frameworks/database/mongoDb/models/jobModel";
import { Employer } from "../frameworks/database/mongoDb/models/employerModel";
import { Types } from "mongoose";

export class JobApplicationEntity {
  public model: JobApplicationModel;

  constructor(model: JobApplicationModel) {
    this.model = model;
  }

  public async applyForJob(
    data: JobApplicationInterface
  ): Promise<JobApplicationInterface | null> {
    const applicationExists = await this.model.findOne({
      userId: data.userId,
      jobId: data.jobId,
    });
    if (!applicationExists) {
      const newApplication = await this.model.create(data);
      return newApplication;
    }
    return null;
  }

  public async isApplied(jobId: string, userId: string): Promise<any> {
    const appliedJod = await this.model.findOne({
      jobId: jobId,
      userId: userId,
    });
    if (appliedJod) {
      return appliedJod;
    }
  }

  public async getAllApplicationsForEmployer(employerId: string): Promise<any> {
    const applications = await this.model
      .find({ employerId })
      .populate({ path: "userId", select: "name email image", model: User })
      .populate({ path: "jobId", select: "title", model: Job });

    return applications;
  }

  public async getApplicationDetails(jobId: Types.ObjectId): Promise<any> {
    const details = await this.model
      .findOne({ _id: jobId })
      .populate({
        path: "userId",
        select: "name email phone about image resume experience skills",
        model: User,
      })
      .populate({ path: "jobId", select: "title location", model: Job })
      .populate({ path: "employerId", select: "companyName", model: Employer})
    return details;
  }

  public async changeStatusOfApplication(
    applicationId: Types.ObjectId,
    status: string
  ): Promise<any> {
    const updatedApplication = await this.model.findOneAndUpdate(
      { _id: applicationId },
      { $set: { applicationStatus: status } },
      { new: true }
    );

    return updatedApplication;
  }

  public async getAllApplicationByUser(userId: Types.ObjectId): Promise<any> {
    const userApplications = await this.model
      .find({ userId })
      .populate({
        path: "jobId",
        select: "title location",
        model: Job,
      })
      .populate({
        path: "employerId",
        select: "companyName",
        model: Employer,
      })
    
    return userApplications;
  }
}
