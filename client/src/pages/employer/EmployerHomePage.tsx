import React from "react";
// import EmployerHome from "../../components/HomePage/EmployerHome";
// import EmployerHeader from "../../components/Header/EmployerHeader";
import Sidenav from "../../components/Employer/Side-nav/SdeNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavRoutes } from "../../context/NavRoutes";
import AllJobsEmployer from "../../components/Employer/Employer/AllJobsEmployer";
import Dashboard from "../../components/Employer/Employer/Dashboard";
import Applications from "../../components/Employer/Employer/Applications";

function EmployerHomePage() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidenav routes={NavRoutes} />
      </div>
      <div className="w-4/5 p-10">
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/all-jobs" element={<AllJobsEmployer />} />
          <Route path="/applications" element={<Applications/>} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default EmployerHomePage;
