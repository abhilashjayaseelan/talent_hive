"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedEmployer = exports.findEmployerById = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const findEmployerById = (id, dbRepositoryEmployer) => {
    try {
        const employer = dbRepositoryEmployer.findEmployerById(id);
        if (!employer) {
            throw new appError_1.default('No employer found', httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        return employer;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.findEmployerById = findEmployerById;
const updatedEmployer = (employerId, updates, dbRepositoryEmployer) => {
    try {
        const employer = dbRepositoryEmployer.updateEmployer(employerId, updates);
        if (!employer) {
            throw new appError_1.default('No employer updates', httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        return employer;
    }
    catch (error) {
        throw new Error(`error while updating the employer ${error.message}`);
    }
};
exports.updatedEmployer = updatedEmployer;
