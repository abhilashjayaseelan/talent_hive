import { JobInterface } from "../types/jobInterface";
import { JobModel } from "../frameworks/database/mongoDb/models/jobModel";
import { EmployerModel } from "../frameworks/database/mongoDb/models/employerModel";

export class JobEntity {
    private model: JobModel;

    constructor(model: JobModel) {
        this.model = model;
    }

    public async createJob(job: JobInterface) : Promise<JobInterface> {
        const newJob = await this.model.create(job);
        return newJob;
    }

    public async updateJob(jobId: string, updates: Partial<JobInterface>): Promise<JobInterface | null> {
        const existingJob = await this.model.findById(jobId);
        if (!existingJob) {
            return null;
        }
        // updating the job according to the changes
        Object.assign(existingJob, updates); 
        const updatedJob = await existingJob.save();
        return updatedJob;
    }                      

    public async deleteJob(jobId: string) : Promise<void> {
        const job = await this.model.findById(jobId);
        if (!job) throw new Error('job not found')
        await this.model.findByIdAndDelete(jobId);
    }
    
    public async getJobByEmployer (employerId : string) : Promise<JobInterface[]> {
        const jobs = await this.model.find({employer: employerId});
        return jobs;
    }

    public async getAllJobs () : Promise<JobInterface[]> {
        const allJobs = await this.model.find();
        return allJobs;
    }

    public async getJobById (Id : string) : Promise<JobInterface | null> {
        const jobData = await this.model.findById(Id).populate('employer', 'companyName email').exec();
        return jobData;
    }
}
