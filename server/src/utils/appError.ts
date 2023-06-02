import { HttpStatus } from "../types/httpStatus";

class AppError extends Error {
    statusCode: number; 
    status: string;
    isOperational: boolean;
    errorMessage: string;
    constructor(message: string, statusCode: HttpStatus) {
      super(message);
      
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      this.errorMessage = message
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
export default AppError;