import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import ShimmerJobDetails from "../../../constants/shimmer/ShimmerJobDetails";
import {
  fetchJobDetails,
  clearJObDetails,
  clearJObId,
} from "../../../features/redux/slices/jobDetailsSlice";
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  LinkIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

function JobDetails() {
  const dispatch = useDispatch();
  const jobId: string =
    useSelector((state: RootState) => state.jobDetails.jobId) ?? "";
  const jobDetails = useSelector(
    (state: RootState) => state.jobDetails.jobDetails
  );

  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchJobDetails(jobId));
    
    const timer = setTimeout(() => {
      setIsDetailsVisible(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      dispatch(clearJObDetails());
      dispatch(clearJObId());
    };
  }, [dispatch, jobId]);

  

  return (
    <div
      className={`max-w-md mx-auto transition-opacity duration-500 ${
        isDetailsVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {jobDetails ? (
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
                  {new Date(jobDetails?.createdAt).toLocaleDateString()}
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
                      {jobDetails.requirements.map((requirement, index) => (
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
                      {jobDetails?.responsibilities.map(
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
                      <span>{jobDetails.salary}</span>
                    </div>
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Openings
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {jobDetails.openings}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Employer
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        <BriefcaseIcon className="w-4 h-4 mr-1 text-purple-600" />
                        <span>{jobDetails?.employer?.companyName}</span>
                      </div>
                      <div className="flex items-center">
                        <LinkIcon className="w-4 h-4 mr-1 text-purple-600" />
                        <span>{jobDetails?.employer?.email}</span>
                      </div>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded hover:bg-purple-500">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ShimmerJobDetails />
      )}
    </div>
  );
}

export default JobDetails;
