"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../types/httpStatus");
const mongoose_1 = require("mongoose");
const appError_1 = __importDefault(require("../../utils/appError"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jobApplication_1 = require("../../app/useCases/jobApplication/jobApplication");
const jobApplicationController = (jobApplicationDbRepository, jobApplicationDbRepositoryImpl, jobApplicationModel) => {
    const dbRepositoryJobApplication = jobApplicationDbRepository(jobApplicationDbRepositoryImpl(jobApplicationModel));
    const applyNewJob = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const customReq = req;
        const jobId = Array.isArray(req.query.jobId)
            ? req.query.jobId[0]
            : req.query.jobId;
        const employerId = Array.isArray(req.query.empId)
            ? req.query.empId[0]
            : req.query.empId;
        let application = {};
        const userId = new mongoose_1.Types.ObjectId(customReq.payload);
        application.jobId = new mongoose_1.Types.ObjectId(String(jobId));
        application.employerId = new mongoose_1.Types.ObjectId(String(employerId));
        application.userId = userId;
        const applyForNewJob = yield (0, jobApplication_1.applyForJob)(application, dbRepositoryJobApplication);
        if (!applyForNewJob) {
            throw new appError_1.default("application failed", httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        res.json({
            status: "success",
            message: "Application send",
            application: applyForNewJob,
        });
    }));
    const existingApplicant = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const customReq = req;
        let jobId = Array.isArray(req.query.jobId)
            ? req.query.jobId[0]
            : req.query.jobId;
        const userId = new mongoose_1.Types.ObjectId(customReq.payload);
        const jobID = new mongoose_1.Types.ObjectId(String(jobId));
        const alreadyApplied = yield (0, jobApplication_1.existingApplication)(jobID, userId, dbRepositoryJobApplication);
        if (alreadyApplied) {
            res.json({
                status: "Applied",
                message: "already applied",
            });
        }
        else {
            res.json({
                status: "Apply Now",
                message: "not applied",
            });
        }
    }));
    const jobApplicationForEmployer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const customReq = req;
        const employerId = customReq.payload;
        const jobApplications = yield (0, jobApplication_1.allApplications)(employerId !== null && employerId !== void 0 ? employerId : "", dbRepositoryJobApplication);
        res.json({
            status: "success",
            applications: jobApplications,
        });
    }));
    const jobApplicationDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const applicationId = new mongoose_1.Types.ObjectId(req.params.id);
        const applicationDetails = yield (0, jobApplication_1.getApplicationDetails)(applicationId !== null && applicationId !== void 0 ? applicationId : "", dbRepositoryJobApplication);
        if (!applicationDetails) {
            throw new appError_1.default("application details not found", httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        res.json({
            status: "success",
            applicationData: applicationDetails,
        });
    }));
    const changeTheApplicationStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const applicationId = new mongoose_1.Types.ObjectId(req.params.id);
        const status = (_a = req.body.status) !== null && _a !== void 0 ? _a : "";
        const updatedApplication = yield (0, jobApplication_1.changeApplicationStatus)(applicationId, status, dbRepositoryJobApplication);
        if (!updatedApplication) {
            throw new appError_1.default('error while updating the status', httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        res.json({
            status: 'success',
            updatedData: updatedApplication
        });
    }));
    const userApplications = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const customReq = req;
        const userId = new mongoose_1.Types.ObjectId(customReq.payload);
        const jobApplications = yield (0, jobApplication_1.userJobApplications)(userId, dbRepositoryJobApplication);
        if (!jobApplications) {
            throw new Error('user job applications not found');
        }
        res.json({
            status: 'success',
            jobApplications
        });
    }));
    return {
        applyNewJob,
        existingApplicant,
        jobApplicationForEmployer,
        jobApplicationDetails,
        changeTheApplicationStatus,
        userApplications
    };
};
exports.default = jobApplicationController;
