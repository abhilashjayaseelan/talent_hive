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
  findJobByEmployer,
  getAllJobs,
  findJobById,
  distinctTitleLocationSalary,
  filterTheJobs
} from "../../app/useCases/job/jobCrud";

const jobController = (
  jobDbRepository: JobDbInterface,
  jobDbRepositoryImpl: JobRepositoryMongoDB,
  jobModel: JobModel
) => {
  const dbRepositoryJob = jobDbRepository(jobDbRepositoryImpl(jobModel));

  const createNewJob = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
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
    }
  );

  const updateTheJob = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
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
    }
  );

  const deleteTheJob = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const jobId = req.params.id;

      if (!jobId) {
        throw new AppError("Job id is required", HttpStatus.BAD_REQUEST);
      }

      await deleteJob(jobId, dbRepositoryJob);

      res.json({
        status: "success",
        message: "job deleted successfully",
      });
    }
  );

  const getJobsByEmployer = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
      const employerId = req.payload ?? "";
      const jobs = await findJobByEmployer(employerId, dbRepositoryJob);
      res.json({status: 'success', jobs});
    }
  );

  const findAllJobs = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const allJobs = await getAllJobs(dbRepositoryJob);
      res.json({
        status: "success",
        allJobs
      })
    }
  );

  const jobDataById = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
      const jobId = req.params.id;
      const jobData = await findJobById(jobId, dbRepositoryJob);
      res.json({
        status: 'success',
        jobData
      })
    }
  )

  const titleLocationSalary = expressAsyncHandler(
    async(req: Request, res: Response) => {
      const field = req.params.field ?? '';
      const distinct = await distinctTitleLocationSalary(field, dbRepositoryJob);
      res.json({
        status: 'success',
        distinct
      });
    }
  )

  const filterJobs = expressAsyncHandler(
    async(req: Request, res: Response) => {
      const {role, location, salary} = req.body;
      const jobs = await filterTheJobs(role, location, salary, dbRepositoryJob);

      res.json({
        status: 'success',
        jobs
      })
    }
  )

  return {
    createNewJob,
    updateTheJob,
    deleteTheJob,
    getJobsByEmployer,
    findAllJobs,
    jobDataById,
    titleLocationSalary,
    filterJobs
  };
};

export default jobController;
