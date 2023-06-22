import { JobInterface } from "../types/jobInterface";
import { JobModel } from "../frameworks/database/mongoDb/models/jobModel";

export class JobEntity {
  private model: JobModel;

  constructor(model: JobModel) {
    this.model = model;
  }

  public async createJob(job: JobInterface): Promise<JobInterface> {
    const newJob = await this.model.create(job);
    return newJob;
  }

  public async updateJob(
    jobId: string,
    updates: Partial<JobInterface>
  ): Promise<JobInterface | null> {
    const existingJob = await this.model.findById(jobId);
    if (!existingJob) {
      return null;
    }
    Object.assign(existingJob, updates);
    const updatedJob = await existingJob.save();
    return updatedJob;
  }

  public async deleteJob(jobId: string): Promise<void> {
    const job = await this.model.findById(jobId);
    if (!job) throw new Error("job not found");
    await this.model.findByIdAndDelete(jobId);
  }

  public async getJobByEmployer(employerId: string): Promise<JobInterface[]> {
    const jobs = await this.model.find({ employer: employerId });
    return jobs;
  }

  public async getAllJobs(): Promise<JobInterface[]> {
    const allJobs = await this.model.find();
    return allJobs;
  }

  public async getJobById(Id: string): Promise<JobInterface | null> {
    const jobData = await this.model
      .findById(Id)
      .populate("employer", "companyName email")
      .exec();
    return jobData;
  }

  public async titleLocationSalary(field: string): Promise<any> {
    const distinctValues = await this.model.distinct(field);
    return distinctValues;
  }

  public async filterJob(title: string, location: string, salary: any): Promise<any> { 
    
    const filter: any = {};

    if (title) {
      filter.title = { $regex: new RegExp(title, "i") };
    }

    if (location) {
      filter.location = { $regex: new RegExp(location, "i") };
    }

    if (salary) {
      filter.salary = salary
    }
    const jobs = await this.model.find(filter);
    return jobs;
  }
}
