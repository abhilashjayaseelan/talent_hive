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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const employerAuth_1 = require("../../app/useCases/auth/employerAuth");
const employerAuth_2 = require("../../app/useCases/auth/employerAuth");
const employerAuthController = (authServiceInterface, authServiceImpl, employerDbRepository, employerDbRepositoryImpl, employer, emailService, emailServiceImpl) => {
    const dbRepositoryEmployer = employerDbRepository(employerDbRepositoryImpl(employer));
    const authService = authServiceInterface(authServiceImpl());
    const sendEmailService = emailService(emailServiceImpl());
    const employerRegister = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const employer = req.body;
        yield (0, employerAuth_1.registerEmployer)(employer, dbRepositoryEmployer, authService);
        res.json({
            status: "success",
            message: "employer registered successfully",
        });
    }));
    const loginEmployer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const token = yield (0, employerAuth_1.employerLogin)(email, password, dbRepositoryEmployer, authService);
        res.json({
            status: "success",
            message: "employer verified",
            token,
        });
    }));
    const emailVerification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.params.emailId;
        yield (0, employerAuth_2.employerEmailVerification)(email, dbRepositoryEmployer, sendEmailService);
        res.json({ status: "success" });
    }));
    const OTPVerification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const OTP = req.params.OTP;
        const response = yield (0, employerAuth_2.verifyEmailOTP)(OTP, sendEmailService);
        if (response) {
            res.json({ status: 'success', message: 'email verified' });
        }
    }));
    return {
        loginEmployer,
        employerRegister,
        emailVerification,
        OTPVerification
    };
};
exports.default = employerAuthController;
