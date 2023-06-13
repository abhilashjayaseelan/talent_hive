export interface JobsInterface {
  _id: any;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  requirements: string[];
  responsibilities: string[];
  salary?: number;
  openings: number;
  employer: any;
  createdAt: Date;
  appliedUsers?: Array<string>;
}
