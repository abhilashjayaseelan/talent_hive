import { Types } from "mongoose";

export interface JobApplicationInterface {
  jobId?: Types.ObjectId;
  userId?: Types.ObjectId;
  employerId?: Types.ObjectId;
  applicationStatus?: string;
  createdAt?: Date;
}
