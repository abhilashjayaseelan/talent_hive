import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import ShimmerJobDetails from "../../shimmer/ShimmerJobDetails";
import {
  fetchEmployerJobDetails,
  clearEmployerJobDetails,
  clearEmployerJobId,
} from "../../../features/redux/slices/employer/employerJobDetailsSlice";
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { Breadcrumbs } from "@material-tailwind/react";

function EmployerViewJob() {
  const dispatch = useDispatch();
  const jobId: string =
    useSelector((state: RootState) => state.employerJobDetails.jobId) ?? "";

  const jobDetails = useSelector(
    (state: RootState) => state.employerJobDetails.jobDetails
  );
  const status = useSelector(
    (state: RootState) => state.employerJobDetails.status
  );
  const error = useSelector(
    (state: RootState) => state.employerJobDetails.error
  );

  useEffect(() => {
    dispatch(fetchEmployerJobDetails(jobId));

    return () => {
      dispatch(clearEmployerJobDetails());
      dispatch(clearEmployerJobId());
    };
  }, [dispatch, jobId]);

  if (status === "loading") {
    return <ShimmerJobDetails />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <div className="pl-40 pt-2">
        <Breadcrumbs className="bg-white">
          <a href="#" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <a href="#" className="opacity-60">
            <span>Jobs</span>
          </a>
          <a href="#">View job details</a>
        </Breadcrumbs>
      </div>
      <div className="max-w-md mx-auto">
        <div className="p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <BriefcaseIcon className="w-6 h-6 mr-2 text-purple-500" />
            <div className="text-lg font-semibold text-gray-900">
              {jobDetails?.title}
            </div>
          </div>
          <div className="flex items-center mb-2 text-sm text-gray-600">
            <div className="flex items-center mr-4">
              <MapPinIcon className="w-4 h-4 mr-1 text-gray-600" />
              <span>{jobDetails?.location}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1 text-purple-600" />
              <span>
                Posted on{" "}
                {new Date(jobDetails?.createdAt ?? "")?.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <dl className="divide-y divide-gray-200">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Description
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.description}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Location
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.location}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Employment Type
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.employmentType}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Requirements
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc list-inside">
                    {jobDetails?.requirements?.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Responsibilities
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc list-inside">
                    {jobDetails?.responsibilities?.map(
                      (responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      )
                    )}
                  </ul>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Salary/month
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center">
                    <CurrencyRupeeIcon className="w-4 h-4 mr-1 text-purple-600" />
                    <span>{jobDetails?.salary}</span>
                  </div>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Openings
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.openings}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerViewJob;
