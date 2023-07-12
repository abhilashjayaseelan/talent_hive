"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const sendEmailService = () => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: config_1.default.NODE_MAIL_USER,
            pass: config_1.default.NODE_MAIL_PASS,
        },
    });
    let otp;
    const sendEmail = (email) => {
        otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpData = {
            email,
            otp,
        };
        setTimeout(() => {
            otp = null;
        }, 120000);
        console.log(otpData);
        const mailOptions = {
            from: "abhimodiyilclan@gmail.com",
            to: email,
            subject: "OTP for Login",
            text: `Your OTP for login is: ${otp}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            }
            else {
                console.log("Email sent:", info.response);
            }
        });
    };
    const verifyOTP = (OTP) => {
        if (OTP == otp) {
            return { message: "OTP verified" };
        }
        else if (otp == null) {
            return { message: "OTP is expired" };
        }
        else {
            return { message: "OTP is invalid" };
        }
    };
    return {
        sendEmail,
        verifyOTP,
    };
};
exports.sendEmailService = sendEmailService;
