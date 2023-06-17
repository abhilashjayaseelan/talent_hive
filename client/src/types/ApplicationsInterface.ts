export default interface ApplicationDetails {
    _id: string;
    userId: {
      _id: string;
      name: string;
      email: string;
      phone?: number;
    };
    employerId: string;
    applicationStatus: string;
    createdAt: Date;
    jobId: {
      _id: string;
      title: string; 
    };
  }
  