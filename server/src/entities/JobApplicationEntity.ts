import { JobApplicationInterface } from "../types/jobApplicationInterface";
import { JobApplicationModel } from "../frameworks/database/mongoDb/models/jobApplicationModel";

export class JobApplicationEntity {
    public model: JobApplicationModel;

    constructor(model: JobApplicationModel) {
        this.model = model;
    }

    public async applyForJob(data: JobApplicationInterface) : Promise<JobApplicationInterface>  {
        const newApplication = await this.model.create(data);
        return newApplication;
    }
}