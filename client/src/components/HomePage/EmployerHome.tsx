import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { FaChartBar, FaBriefcase, FaEnvelope, FaCog } from "react-icons/fa";
import AllJobsEmployer from "../Employer/Employer/AllJobsEmployer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";
import {
  fetchEmployer,
  clearEmployerDetails,
} from "../../features/redux/slices/employerDetailsSlice";

function EmployerHome() {
  const dispatch = useDispatch();
  const employerDetails = useSelector(
    (state: RootState) => state.employerDetails.employerDetails
  );
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
    <div className="h-screen bg-foundItBg">
      <div className="flex">
        <div className=" w-1/5 bg-white shadow-md mt-10 ml-4 rounded border border-gray-300">
          <ul className="p-4">
            <li className="mb-4 py-2 px-4 rounded border border-gray-300 flex items-center hover:bg-purple-500 hover:text-white text-sm">
              <FaChartBar className="mr-2" />
              Dashboard
            </li>
            <li className="mb-4 py-2 px-4 rounded border border-gray-300 flex items-center hover:bg-purple-500 hover:text-white text-sm">
              <FaBriefcase className="mr-2" />
              Jobs
            </li>
            <li className="mb-4 py-2 px-4 rounded border border-gray-300 flex items-center hover:bg-purple-500 hover:text-white text-sm">
              <FaEnvelope className="mr-2" />
              Applications
            </li>
            <li className="mb-4 py-2 px-4 rounded border border-gray-300 flex items-center hover:bg-purple-500 hover:text-white text-sm">
              <FaCog className="mr-2" />
              Settings
            </li>
          </ul>
        </div>
        <div className="w-4/5 p-10">
          {/* <h1 className="text-2xl font-bold mb-4">Welcome, Back ! 🤖</h1> */}
          {/* Rest of the content */}
          <AllJobsEmployer />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EmployerHome;
