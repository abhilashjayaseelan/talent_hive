import { HttpStatus } from "../../../types/httpStatus";
import { CreateEmployerInterface } from "../../../types/employerInterface";
import AppError from "../../../utils/appError";
import { EmployerDbInterface } from "../../repositories/employerDbRepository";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { EmailServiceInterface } from "../../services/emailServiceInterface";

export const registerEmployer = async (
  employer: CreateEmployerInterface,
  employerRepository: ReturnType<EmployerDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  employer.email = employer?.email?.toLowerCase();
  const isExistingEmail = await employerRepository.getEmployerByEmail(
    employer.email ?? ''
  );
  if (isExistingEmail) {
    throw new AppError("email already exists", HttpStatus.CONFLICT);
  }
  employer.password = await authService.encryptPassword(employer.password ?? '');
  const result = await employerRepository.createEmployer(employer);
  return result;
};

export const employerLogin = async (
  email: string,
  password: string,
  employerRepository: ReturnType<EmployerDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const employer = await employerRepository.getEmployerByEmail(email);
  if (!employer) {
    throw new AppError("no user found", HttpStatus.UNAUTHORIZED);
  }

  const isPasswordCorrect = await authService.comparePassword(
    password,
    employer.password ?? ''
  );
  if (!isPasswordCorrect) {
    throw new AppError("Incorrect password", HttpStatus.UNAUTHORIZED);
  }
  const token = authService.generateToken(employer._id.toString(), 'employer')
  return token;
};

export const employerEmailVerification = async (
  email: string,
  employerRepository: ReturnType<EmployerDbInterface>,
  emailService: ReturnType<EmailServiceInterface>
) => {
  const existingEmail = await employerRepository.getEmployerByEmail(email);

  if(existingEmail) {
    throw new AppError("email already exists", HttpStatus.CONFLICT);
  }

  emailService.sendOtpEmail(email);
}

export const verifyEmailOTP = async (
  OTP: string,
  emailService: ReturnType<EmailServiceInterface>
) => {
  const response = emailService.verifyOTP(OTP);

  if (response.message !== 'OTP verified') {
    throw new AppError("Invalid OTP", HttpStatus.BAD_REQUEST);
  }

  return response;
}