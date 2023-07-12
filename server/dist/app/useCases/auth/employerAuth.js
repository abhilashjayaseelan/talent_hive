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
exports.verifyEmailOTP = exports.employerEmailVerification = exports.employerLogin = exports.registerEmployer = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const registerEmployer = (employer, employerRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    employer.email = (_a = employer === null || employer === void 0 ? void 0 : employer.email) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const isExistingEmail = yield employerRepository.getEmployerByEmail((_b = employer.email) !== null && _b !== void 0 ? _b : '');
    if (isExistingEmail) {
        throw new appError_1.default("email already exists", httpStatus_1.HttpStatus.CONFLICT);
    }
    employer.password = yield authService.encryptPassword((_c = employer.password) !== null && _c !== void 0 ? _c : '');
    const result = yield employerRepository.createEmployer(employer);
    return result;
});
exports.registerEmployer = registerEmployer;
const employerLogin = (email, password, employerRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const employer = yield employerRepository.getEmployerByEmail(email);
    if (!employer) {
        throw new appError_1.default("no user found", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, (_d = employer.password) !== null && _d !== void 0 ? _d : '');
    if (!isPasswordCorrect) {
        throw new appError_1.default("Incorrect password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(employer._id.toString(), 'employer');
    return token;
});
exports.employerLogin = employerLogin;
const employerEmailVerification = (email, employerRepository, emailService) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEmail = yield employerRepository.getEmployerByEmail(email);
    if (existingEmail) {
        throw new appError_1.default("email already exists", httpStatus_1.HttpStatus.CONFLICT);
    }
    emailService.sendOtpEmail(email);
});
exports.employerEmailVerification = employerEmailVerification;
const verifyEmailOTP = (OTP, emailService) => __awaiter(void 0, void 0, void 0, function* () {
    const response = emailService.verifyOTP(OTP);
    if (response.message !== 'OTP verified') {
        throw new appError_1.default("Invalid OTP", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return response;
});
exports.verifyEmailOTP = verifyEmailOTP;
