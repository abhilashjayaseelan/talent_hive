import React from "react";
import Sidenav from "../../components/Employer/Side-nav/SdeNav";
import { Routes, Route } from "react-router-dom";
import { NavRoutes } from "../../context/NavRoutes";
import AllJobsEmployer from "../../components/Employer/Employer/AllJobsEmployer";
import Dashboard from "../../components/Employer/Employer/Dashboard";
import Applications from "../../components/Employer/Employer/Applications";
import EmployerHeaderWithNav from "../../components/Header/EmployerHeaderWithNav";

function EmployerHomePage() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidenav routes={NavRoutes} />
      </div>
      <div className="w-4/5 pl-6 pr-6">
        <div className="relative mx-auto flex items-center text-blue-gray-900 pb-10 pt-6">
          <EmployerHeaderWithNav />
        </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-jobs" element={<AllJobsEmployer />} />
          <Route path="/applications" element={<Applications />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default EmployerHomePage;
