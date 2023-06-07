import { Request, Response } from "express";
import { CustomRequest } from "../../types/expressRequest";
import expressAsyncHandler from "express-async-handler";
import { JobRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/jobRepositoryMongoDB";
import { JobDbInterface } from "../../app/repositories/jobDbRepository";
import { JobInterface } from "../../types/jobInterface";
import { JobModel } from "../../frameworks/database/mongoDb/models/jobModel";
import { Types } from "mongoose";
import AppError from "../../utils/appError";
import { HttpStatus } from "../../types/httpStatus";
import {
  createJob,
  updateJob,
  deleteJob,
} from "../../app/useCases/job/jobCrud";

const jobController = (
  jobDbRepository: JobDbInterface,
  jobDbRepositoryImpl: JobRepositoryMongoDB,
  jobModel: JobModel
) => {
  const dbRepositoryJob = jobDbRepository(jobDbRepositoryImpl(jobModel));

  const createNewJob = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
      try {
        const job: JobInterface = req.body;
        const employerId = new Types.ObjectId(req.payload);
        job.employer = employerId;

        const createdJob = await createJob(job, dbRepositoryJob);

        if (!createdJob) {
          throw new AppError(
            "Job creation failed",
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }

        res.json({
          status: "success",
          message: "Job created successfully",
          job: createdJob,
        });
      } catch (error: any) {
        res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: "error",
          message: error.message || "Job creation failed",
        });
      }
    }
  );

  const updateTheJob = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
      try {
        const jobId = req.params.id;
        const update = req.body;

        if (!jobId) {
          throw new AppError("Job ID is required", HttpStatus.BAD_REQUEST);
        }

        const updatedJob = await updateJob(update, jobId, dbRepositoryJob);

        if (!updatedJob) {
          throw new AppError("Job not found", HttpStatus.NOT_FOUND);
        }

        res.json({
          status: "success",
          message: "Job updated successfully",
          job: updatedJob,
        });
      } catch (error: any) {
        res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: "error",
          message: error.message || "Job update failed",
        });
      }
    }
  );

  const deleteTheJob = expressAsyncHandler(
    async (req: Request, res: Response) => {
      try {
        const jobId = req.params.id;

        if (!jobId) {
          throw new AppError("Job id is required", HttpStatus.BAD_REQUEST);
        }

        await deleteJob(jobId, dbRepositoryJob);

        res.json({
          status: "success",
          message: "job deleted successfully",
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "job deletion failed",
        });
      }
    }
  );

  return {
    createNewJob,
    updateTheJob,
    deleteTheJob
  };
};

export default jobController;
