import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../app/services/authServiceInterface";
import { EmployerDbInterface } from "../../app/repositories/employerDbRepository";
import { EmployerRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/employerRepositoryMongoDB";
import { employerLogin } from "../../app/useCases/auth/employerAuth";
import { registerEmployer } from "../../app/useCases/auth/employerAuth";
import { EmployerInterface } from "../../types/employerInterface";

const employerAuthController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  employerDbRepository: EmployerDbInterface,
  employerDbRepositoryImpl: EmployerRepositoryMongoDB
) => {
  const dbRepositoryEmployer = employerDbRepository(employerDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const employerRegister = expressAsyncHandler(
    async (req: Request, res: Response) => {
      try {
        const employer: EmployerInterface = req.body;
        await registerEmployer(employer, dbRepositoryEmployer, authService);
        res.json({
          status: "success",
          message: "employer registered successfully",
        });
      } catch (error: any) {
        res.status(error.statusCode ?? 500).json({
          status: "error",
          error,
        });
      }
    }
  );

  const loginEmployer = expressAsyncHandler(
    async (req: Request, res: Response) => {
      try {
        const { email, password }: { email: string; password: string } =
          req.body;
        const token = await employerLogin(
          email,
          password,
          dbRepositoryEmployer,
          authService
        );
        res.json({
          status: "success",
          message: "employer verified",
          token,
        });
      } catch (error: any) {
        res.status(error.statusCode ?? 500).json({
          status: "error",
          error,
        });
      }
    }
  );

  return {
    loginEmployer,
    employerRegister,
  };
};

export default employerAuthController;
