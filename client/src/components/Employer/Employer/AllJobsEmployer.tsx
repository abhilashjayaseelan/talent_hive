import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmployerJobs } from "../../../features/redux/slices/employerJobsSlice";
import { employerJobs } from "../../../features/axios/api/jobsByEmployer";
import JobsByEmployer from "../Sections/JobsByEmployer";
import { JobsInterface } from "../../../types/JobInterface";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function AllJobsEmployer() {
  const dispatch = useDispatch();
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
  }, [dispatch]);

  const employerAllJobs = useSelector(
    (state: any) => state.employerJobs.employerJobs.jobs
  );

  return (
    <div>
      <div className="mb-4">
        <Link to={'/job/create-job'}>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Post Job
          </button>
        </Link>
      </div>
      {employerAllJobs &&
        employerAllJobs.map((job: JobsInterface) => (
          <JobsByEmployer key={job._id} jobs={job} />
        ))}
    </div>
  );
}

export default AllJobsEmployer;
