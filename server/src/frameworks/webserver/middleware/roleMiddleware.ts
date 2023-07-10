import { Response, Request, NextFunction } from "express";
import { CustomRequest } from "../../../types/expressRequest";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";

const roleMiddleware = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as CustomRequest;

    // Check if the role matches the required role
    if (customReq.role !== role) {
      throw new AppError("Unauthorized user", HttpStatus.UNAUTHORIZED);
    }

    // Role matches, proceed to the next middleware or route handler
    next();
  };
};

export default roleMiddleware;
