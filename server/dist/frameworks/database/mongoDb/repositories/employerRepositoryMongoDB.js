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
exports.EmployerRepositoryMongoDB = void 0;
const employerModel_1 = __importDefault(require("../models/employerModel"));
const EmployerRepositoryMongoDB = () => {
    const getEmployerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const employer = yield employerModel_1.default.findOne({ email });
        return employer;
    });
    const createEmployer = (employer) => __awaiter(void 0, void 0, void 0, function* () {
        const newEmployer = yield employerModel_1.default.create(employer);
        return newEmployer;
    });
    return {
        getEmployerByEmail,
        createEmployer
    };
};
exports.EmployerRepositoryMongoDB = EmployerRepositoryMongoDB;
