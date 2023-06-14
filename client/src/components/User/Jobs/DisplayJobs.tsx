import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../../../features/redux/slices/getAllJobsSlice";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { JobsInterface } from "../../../types/JobInterface";
import JobList from "./JobList";
import JobDetails from "./JobDetails";

function DisplayJobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.allJobs.jobs);
  const status = useSelector((state: RootState) => state.allJobs.status);
  const error = useSelector((state: RootState) => state.allJobs.error);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-20 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-wrap min-h-screen bg-green-300">
      <div className="w-full sm:w-2/5 p-4 sm:p-6 bg-slate-400">
        {jobs &&
          jobs.map((job: JobsInterface) => (
            <JobList key={job._id} jobs={job} />
          ))}
      </div>
      <div className="w-full sm:w-3/5 p-4 sm:p-6 bg-stone-600">
        <JobDetails />
      </div>
    </div>
  );
}

export default DisplayJobs;
