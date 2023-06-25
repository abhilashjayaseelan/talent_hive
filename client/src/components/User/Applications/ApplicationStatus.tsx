import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import {
  fetchApplicationDetails,
  clearApplicationDetails,
  clearApplicationId,
} from "../../../features/redux/slices/user/userApplicationDetailsSlice";

function ApplicationStatus() {
    const dispatch = useDispatch();
    const applicationId : string = useSelector((state: RootState) => state.applicationDetails.applicationId) ?? '';
    const applicationDetails = useSelector((state: RootState) => state.applicationDetails.applicationDetails);
    console.log(applicationDetails)
    useEffect(() => {
        dispatch(fetchApplicationDetails(applicationId));

        return () => {
            dispatch(clearApplicationDetails());
            dispatch(clearApplicationId());
        }
    }, [dispatch, applicationId]);

  return <div></div>;
}

export default ApplicationStatus;
