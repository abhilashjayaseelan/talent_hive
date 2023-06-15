import React, { useEffect, useState } from "react";
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
  const [selected, setSelected] = useState("");

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
    <div className="pt-20 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-wrap min-h-screen">
      <div className="w-full sm:w-2/4 p-4 sm:p-6">
        <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(100vh - 80px)" }}>
          {jobs &&
            jobs.map((job: JobsInterface) => (
              <JobList
                key={job._id}
                jobs={job}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
        </div>
      </div>
      <div className="w-full sm:w-2/4 p-4 sm:p-6 bg-white">
        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 80px)" }}>
          <JobDetails />
        </div>
      </div>
    </div>
  );
}

export default DisplayJobs;
