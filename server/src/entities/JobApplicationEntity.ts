import { JobApplicationInterface } from "../types/jobApplicationInterface";
import { JobApplicationModel } from "../frameworks/database/mongoDb/models/jobApplicationModel";

export class JobApplicationEntity {
    public model: JobApplicationModel;

    constructor(model: JobApplicationModel) {
        this.model = model;
    }

    public async applyForJob(data: JobApplicationInterface) : Promise<JobApplicationInterface | null> {
        console.log(data.jobId, data.userId)
        const applicationExists = await this.model.findOne({userId: data.userId, jobId: data.jobId});
        console.log(applicationExists)
        if (!applicationExists) {
            const newApplication = await this.model.create(data);
            return newApplication;
        }
        return null;
    }

    public async isApplied(jobId: string, userId: string) : Promise<any>{
        console.log(jobId, userId)
        const appliedJod = await this.model.findOne({jobId:jobId, userId: userId});
        console.log(appliedJod, 'applied')
        if (appliedJod){
            return appliedJod;
        }
    }
}