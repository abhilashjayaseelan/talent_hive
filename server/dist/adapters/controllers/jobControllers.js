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
const mongoose_1 = require("mongoose");
const httpStatus_1 = require("../../types/httpStatus");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const appError_1 = __importDefault(require("../../utils/appError"));
const jobCrud_1 = require("../../app/useCases/job/jobCrud");
const jobController = (jobDbRepository, jobDbRepositoryImpl, jobModel) => {
    const dbRepositoryJob = jobDbRepository(jobDbRepositoryImpl(jobModel));
    const createNewJob = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const customReq = req;
        const job = req.body;
        const employerId = new mongoose_1.Types.ObjectId(customReq.payload);
        job.employer = employerId;
        const createdJob = yield (0, jobCrud_1.createJob)(job, dbRepositoryJob);
        if (!createdJob) {
            throw new appError_1.default("Job creation failed", httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        res.json({
            status: "success",
            message: "Job created successfully",
            job: createdJob,
        });
    }));
    const updateTheJob = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const jobId = req.params.id;
        const update = req.body;
        if (!jobId) {
            throw new appError_1.default("Job ID is required", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        const updatedJob = yield (0, jobCrud_1.updateJob)(update, jobId, dbRepositoryJob);
        if (!updatedJob) {
            throw new appError_1.default("Job not found", httpStatus_1.HttpStatus.NOT_FOUND);
        }
        res.json({
            status: "success",
            message: "Job updated successfully",
            job: updatedJob,
        });
    }));
    const deleteTheJob = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const jobId = req.params.id;
        if (!jobId) {
            throw new appError_1.default("Job id is required", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        yield (0, jobCrud_1.deleteJob)(jobId, dbRepositoryJob);
        res.json({
            status: "success",
            message: "job deleted successfully",
        });
    }));
    const getJobsByEmployer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const customReq = req;
        const employerId = (_a = customReq.payload) !== null && _a !== void 0 ? _a : "";
        const jobs = yield (0, jobCrud_1.findJobByEmployer)(employerId, dbRepositoryJob);
        res.json({ status: 'success', jobs });
    }));
    const findAllJobs = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const allJobs = yield (0, jobCrud_1.getAllJobs)(dbRepositoryJob);
        res.json({
            status: "success",
            allJobs
        });
    }));
    const jobDataById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const jobId = req.params.id;
        const jobData = yield (0, jobCrud_1.findJobById)(jobId, dbRepositoryJob);
        res.json({
            status: 'success',
            jobData
        });
    }));
    const titleLocationSalary = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const field = (_b = req.params.field) !== null && _b !== void 0 ? _b : '';
        const distinct = yield (0, jobCrud_1.distinctTitleLocationSalary)(field, dbRepositoryJob);
        res.json({
            status: 'success',
            distinct
        });
    }));
    const filterJobs = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { role, location, salary } = req.body;
        const jobs = yield (0, jobCrud_1.filterTheJobs)(role, location, salary, dbRepositoryJob);
        res.json({
            status: 'success',
            jobs
        });
    }));
    return {
        createNewJob,
        updateTheJob,
        deleteTheJob,
        getJobsByEmployer,
        findAllJobs,
        jobDataById,
        titleLocationSalary,
        filterJobs
    };
};
exports.default = jobController;
