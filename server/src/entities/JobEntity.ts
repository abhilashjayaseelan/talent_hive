import { JobInterface } from "../types/jobInterface";
import { JobModel } from "../frameworks/database/mongoDb/models/jobModel";

export class JobEntity {
    private model: JobModel;

    constructor(model: JobModel) {
        this.model = model;
    }

    public async createJob(job: JobInterface) : Promise<JobInterface> {
        const newJob = this.model.create(job);
        return newJob;
    }

    public async updateJob(jobId: string, updates: Partial<JobInterface>): Promise<JobInterface | null> {
        const existingJob = await this.model.findById(jobId);
        if (!existingJob) {
            return null;
        }

        Object.assign(existingJob, updates);

        const updatedJob = await existingJob.save();
        return updatedJob;
    }

    public async deleteJob(jobId: string) : Promise<void> {
        const job = await this.model.findById(jobId);
        if (!job) throw new Error('job not found')
        await this.model.findByIdAndDelete(jobId);
    }
}