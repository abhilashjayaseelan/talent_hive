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
  getApplicationDetails
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
    async (req: CustomRequest, res: Response) => {
      const jobId = Array.isArray(req.query.jobId)
        ? req.query.jobId[0]
        : req.query.jobId;
      const employerId = Array.isArray(req.query.empId)
        ? req.query.empId[0]
        : req.query.empId;

      let application: JobApplicationInterface = {};

      const userId = new Types.ObjectId(req.payload);
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
    async (req: CustomRequest, res: Response) => {
      let jobId = Array.isArray(req.query.jobId)
        ? req.query.jobId[0]
        : req.query.jobId;
      const userId = new Types.ObjectId(req.payload);
      const jobID =  new Types.ObjectId(String(jobId))

      const alreadyApplied = await existingApplication(
        jobID,
        userId,
        dbRepositoryJobApplication
      );
      if(alreadyApplied) {
        res.json({
          status: 'Applied',
          message: 'already applied'
        })
      } else {
        res.json( {
          status: 'Apply Now',
          message: 'not applied'
        })
      }
    }
  );

  const jobApplicationForEmployer = expressAsyncHandler(
    async(req: CustomRequest, res: Response) => {
      const employerId = req.payload;
      const jobApplications = await allApplications(employerId ?? '', dbRepositoryJobApplication);
      res.json({
        status: 'success',
        applications: jobApplications
      })
    }
  )

  const jobApplicationDetails = expressAsyncHandler(
    async(req: Request, res: Response) => {
      const jobId = new Types.ObjectId(req.params.id);
      const applicationDetails = await getApplicationDetails(jobId ?? '', dbRepositoryJobApplication );

      if(!applicationDetails) {
        throw new AppError('application details not found', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      res.json({
        status: 'success',
        applicationData: applicationDetails
      })
    }
  )

  return {
    applyNewJob,
    existingApplicant,
    jobApplicationForEmployer,
    jobApplicationDetails
  };
};

export default jobApplicationController;
