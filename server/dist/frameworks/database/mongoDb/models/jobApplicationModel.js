"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplication = void 0;
const mongoose_1 = require("mongoose");
const jobApplicationSchema = new mongoose_1.Schema({
    jobId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Please add the job id']
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add the user id']
    },
    employerId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.JobApplication = (0, mongoose_1.model)('JobApplication', jobApplicationSchema, 'jobApplications');
