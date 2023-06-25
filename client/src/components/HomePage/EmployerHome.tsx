import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";
import {
  fetchEmployer,
  clearEmployerDetails,
} from "../../features/redux/slices/employer/employerDetailsSlice";

function EmployerHome() {
  const dispatch = useDispatch();

  const status = useSelector(
    (state: RootState) => state.employerDetails.status
  );
  const error = useSelector((state: RootState) => state.employerDetails.error);

  useEffect(() => {
    dispatch(fetchEmployer());
    return () => {
      dispatch(clearEmployerDetails());
    };
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen">
      <ToastContainer />
    </div>
  );
}

export default EmployerHome;
