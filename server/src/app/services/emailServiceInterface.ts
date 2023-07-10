import { SendEmailService } from "../../frameworks/services/emailService";

export const emailServiceInterface = (
    service: ReturnType<SendEmailService>
) => {
    const sendOtpEmail = (email: string) => {
        service.sendEmail(email);
    }

    const verifyOTP = (OTP: string) => {
        const response = service.verifyOTP(OTP);
        return response;
    }

    return {
        sendOtpEmail,
        verifyOTP
    }
}

export type EmailServiceInterface = typeof emailServiceInterface;