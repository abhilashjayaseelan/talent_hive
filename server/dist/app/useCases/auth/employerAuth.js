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
exports.employerLogin = exports.registerEmployer = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const registerEmployer = (employer, employerRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    employer.email = employer.email.toLowerCase();
    const isExistingEmail = yield employerRepository.getEmployerByEmail(employer.email);
    if (isExistingEmail) {
        throw new appError_1.default("email already exists", httpStatus_1.HttpStatus.CONFLICT);
    }
    employer.password = yield authService.encryptPassword(employer.password);
    const result = yield employerRepository.createEmployer(employer);
    return result;
});
exports.registerEmployer = registerEmployer;
const employerLogin = (email, password, employerRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const employer = yield employerRepository.getEmployerByEmail(email);
    if (!employer) {
        throw new appError_1.default("no user found", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, employer.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default("Incorrect password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(employer._id.toString());
    return token;
});
exports.employerLogin = employerLogin;
