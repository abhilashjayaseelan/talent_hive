import { Response, Request, NextFunction } from "express";
import { CustomRequest } from "../../../types/expressRequest";
import { authService } from "../../services/authService";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";

const authenticationMiddleware = (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  const customReq = req as CustomRequest
  let token: string | null = "";
  if ( customReq.headers.authorization && customReq.headers.authorization.startsWith("Bearer")) {
    token = customReq.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new AppError('Token not found', HttpStatus.UNAUTHORIZED);
  }
  try {
    const { payload, role }: any = authService().verifyToken(token);
    customReq.payload = payload;
    customReq.role = role;
    next();
  } catch (error) {
    throw new AppError('UnAuthorized user', HttpStatus.UNAUTHORIZED);
  }
};

export default authenticationMiddleware;
