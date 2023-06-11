import React from "react";
import EmployerHeader from "../Header/EmployerHeader";

function EmployerHome() {
  return (
    <div>
      <EmployerHeader />
      <div className="flex">
        <div className="w-1/4 bg-gray-200">
          <ul className="p-4">
            <li className="mb-4 py-2 px-4 bg-gray-300 rounded">Dashboard</li>
            <li className="mb-4 py-2 px-4 bg-gray-300 rounded">Jobs</li>
            <li className="mb-4 py-2 px-4 bg-gray-300 rounded">Applications</li>
            <li className="mb-4 py-2 px-4 bg-gray-300 rounded">Settings</li>
          </ul>
        </div>
        <div className="w-3/4 bg-white p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome, Employer!</h1>
          {/* Rest of the content */}
        </div>
      </div>
    </div>
  );
}

export default EmployerHome;
