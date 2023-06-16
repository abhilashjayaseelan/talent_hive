import { Schema, model } from "mongoose";

const jobSchema = new Schema({
    title: {
        type : String,
        required: [true, "please provide the title for the job "]
    },
    description: {
        type: String,
        required: [true, "please provide the job description"]
    },
    location: {
        type: String,
        required: [true, "please give the location"]
    }, 
    employmentType: {
        type: String, 
        required: [true, "please give the employment type"]
    },
    requirements: {
        type: Array,
        required: true
    },
    responsibilities: {
        type: Array,
        required: true
    },
    salary: {
        type: Number,
        required: false
    },
    openings: {
        type: Number,
        required: [true, "please add the number of openings"]
    },
    employer: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
        required: [true, 'please add employerId']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const Job = model("Job", jobSchema, 'jobs');
export type JobModel = typeof Job;  