import {Schema, model} from "mongoose";

const jobApplicationSchema = new Schema ({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Please add the job id']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add the user id']
    },
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
        required: [true, 'Please add teh employer id']
    },
    applicationStatus: {
        type: String,
        default: 'Applied'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const JobApplication = model('JobApplication', jobApplicationSchema, 'jobApplications');
export type JobApplicationModel = typeof JobApplication;