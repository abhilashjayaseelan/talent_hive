"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailServiceInterface = void 0;
const emailServiceInterface = (service) => {
    const sendOtpEmail = (email) => {
        service.sendEmail(email);
    };
    const verifyOTP = (OTP) => {
        const response = service.verifyOTP(OTP);
        return response;
    };
    return {
        sendOtpEmail,
        verifyOTP
    };
};
exports.emailServiceInterface = emailServiceInterface;
