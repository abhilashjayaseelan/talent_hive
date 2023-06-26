import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import {
  fetchApplicationDetails,
  clearApplicationDetails,
  clearApplicationId,
} from "../../../features/redux/slices/user/userApplicationDetailsSlice";
import {
  BriefcaseIcon,
  CalendarIcon,
  // CurrencyRupeeIcon,
  // LinkIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import ApplicationTimeline from "./ApplicationTimeLine";

function ApplicationStatus() {
  const dispatch = useDispatch();
  const applicationId: string =
    useSelector((state: RootState) => state.applicationDetails.applicationId) ??
    "";
  const applicationDetails = useSelector(
    (state: RootState) => state.applicationDetails.applicationDetails
  );
  console.log(applicationDetails);
  useEffect(() => {
    dispatch(fetchApplicationDetails(applicationId));

    return () => {
      dispatch(clearApplicationDetails());
      dispatch(clearApplicationId());
    };
  }, [dispatch, applicationId]);

  return (
    <div className={`max-w-md mx-auto transition-opacity duration-500`}>
      {applicationDetails ? (
        <div className="max-w-md mx-auto ">
          <div className="p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <BriefcaseIcon className="w-6 h-6 mr-2 text-purple-500" />
              <div className="text-lg font-semibold text-gray-900">
                {applicationDetails?.jobId?.title}
              </div>
            </div>
            <div className="flex items-center mb-2 text-sm text-gray-600">
              <div className="flex items-center mr-4">
                <MapPinIcon className="w-4 h-4 mr-1 text-gray-600" />
                <span>{applicationDetails?.jobId?.location}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1 text-purple-600" />
                <span>
                  Applied on{" "}
                  {new Date(applicationDetails?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                <BriefcaseIcon className="w-4 h-4 mr-1 text-purple-600" />
                <span>{applicationDetails?.employerId?.companyName}</span>
              </div>
            </div>
          </div>
          <ApplicationTimeline
            applicationStatus={applicationDetails?.applicationStatus}
          />
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center">
          <h5 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-inherit antialiased">
            Select Job applications to view details
          </h5>
        </div>
      )}
    </div>
  );
}

export default ApplicationStatus;
