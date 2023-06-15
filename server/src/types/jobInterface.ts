import { Types } from "mongoose";

export interface JobInterface {
  title?: string;
  description?: string;
  location?: string;
  employmentType?: string;
  requirements?: string[];
  responsibilities?: string[];
  salary?: number;
  openings?: number;
  employer?: Types.ObjectId;
  createdAt?: Date;
  appliedUsers?: Array<string>
}
