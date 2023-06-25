import { JobApplicationInterface } from "../../types/jobApplicationInterface";
import { JobApplicationModel } from "../../frameworks/database/mongoDb/models/jobApplicationModel";
import { JobApplicationDbInterface } from "../../app/repositories/jobApplicationDbRepository";
import { JobApplicationRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/jobApplicationRepositoryMongoDB";
import { HttpStatus } from "../../types/httpStatus";
import { Request, Response, application } from "express";
import { CustomRequest } from "../../types/expressRequest";
import { Types } from "mongoose";
import AppError from "../../utils/appError";
import expressAsyncHandler from "express-async-handler";
import {
  applyForJob,
  existingApplication,
  allApplications,
  getApplicationDetails,
  changeApplicationStatus,
  userJobApplications
} from "../../app/useCases/jobApplication/jobApplication";

const jobApplicationController = (
  jobApplicationDbRepository: JobApplicationDbInterface,
  jobApplicationDbRepositoryImpl: JobApplicationRepositoryMongoDB,
  jobApplicationModel: JobApplicationModel
) => {
  const dbRepositoryJobApplication = jobApplicationDbRepository(
    jobApplicationDbRepositoryImpl(jobApplicationModel)
  );

  const applyNewJob = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const jobId = Array.isArray(req.query.jobId)
        ? req.query.jobId[0]
        : req.query.jobId;
      const employerId = Array.isArray(req.query.empId)
        ? req.query.empId[0]
        : req.query.empId;

      let application: JobApplicationInterface = {};

      const userId = new Types.ObjectId(customReq.payload);
      application.jobId = new Types.ObjectId(String(jobId));
      application.employerId = new Types.ObjectId(String(employerId));
      application.userId = userId;

      const applyForNewJob = await applyForJob(
        application,
        dbRepositoryJobApplication
      );

      if (!applyForNewJob) {
        throw new AppError(
          "application failed",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      res.json({
        status: "success",
        message: "Application send",
        application: applyForNewJob,
      });
    }
  );

  const existingApplicant = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      let jobId = Array.isArray(req.query.jobId)
        ? req.query.jobId[0]
        : req.query.jobId;
      const userId = new Types.ObjectId(customReq.payload);
      const jobID = new Types.ObjectId(String(jobId));

      const alreadyApplied = await existingApplication(
        jobID,
        userId,
        dbRepositoryJobApplication
      );
      if (alreadyApplied) {
        res.json({
          status: "Applied",
          message: "already applied",
        });
      } else {
        res.json({
          status: "Apply Now",
          message: "not applied",
        });
      }
    }
  );

  const jobApplicationForEmployer = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const employerId = customReq.payload;
      const jobApplications = await allApplications(
        employerId ?? "",
        dbRepositoryJobApplication
      );
      res.json({
        status: "success",
        applications: jobApplications,
      });
    }
  );

  const jobApplicationDetails = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const applicationId = new Types.ObjectId(req.params.id);
      const applicationDetails = await getApplicationDetails(
        applicationId ?? "",
        dbRepositoryJobApplication
      );

      if (!applicationDetails) {
        throw new AppError(
          "application details not found",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      res.json({
        status: "success",
        applicationData: applicationDetails,
      });
    }
  );

  const changeTheApplicationStatus = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const applicationId = new Types.ObjectId(req.params.id);
      const status = req.body.status ?? "";
      const updatedApplication = await changeApplicationStatus(
        applicationId,
        status,
        dbRepositoryJobApplication
      );

      if(!updatedApplication) {
        throw new AppError('error while updating the status', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      res.json({
        status: 'success',
        updatedData: updatedApplication
      })
    }
  );

  const userApplications = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const customReq = req as CustomRequest;
      const userId = new Types.ObjectId(customReq.payload);
      const jobApplications = await userJobApplications(userId, dbRepositoryJobApplication);

      if (!jobApplications) {
        throw new Error('user job applications not found');
      }

      res.json({
        status: 'success',
        jobApplications
      })

    }
  )

  return {
    applyNewJob,
    existingApplicant,
    jobApplicationForEmployer,
    jobApplicationDetails,
    changeTheApplicationStatus,
    userApplications 
  };
};

export default jobApplicationController;
