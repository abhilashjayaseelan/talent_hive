import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEmployerJobs, setEmployerJobs } from "../../../features/redux/slices/employerJobsSlice";
import { employerJobs } from "../../../features/axios/api/jobsByEmployer";
import JobsByEmployer from "../Sections/JobsByEmployer";
import { JobsInterface } from "../../../types/JobInterface";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { RootState } from "../../../features/redux/reducers/Reducer";

function AllJobsEmployer() {
  const dispatch = useDispatch();
  const deleted = useSelector((state: RootState) => state.employerJobs.change);
  useEffect(() => {
    const fetchJobsAndStore = async () => {
      try {
        const jobs = await employerJobs();
        dispatch(setEmployerJobs(jobs));
      } catch (error: any) {
        throw new Error("failed fetching jobs", error);
      }
    };
    fetchJobsAndStore();
    return ()=> {
      clearEmployerJobs();
    }
  }, [dispatch, deleted]);

  const employerAllJobs = useSelector(
    (state: any) => state.employerJobs.employerJobs.jobs
  );

  return (
    <div className="">
      <div className="mb-4">
        <Link to={"/job/create-job"}>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Post Job
          </button>
        </Link>
      </div>
      <div>
        {employerAllJobs &&
          employerAllJobs.map((job: JobsInterface) => (
            <JobsByEmployer key={job._id} jobs={job} />
          ))}
      </div>
    </div>
  );
}

export default AllJobsEmployer;
