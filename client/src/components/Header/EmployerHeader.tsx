import React from "react";
import { Navbar } from "@material-tailwind/react";

function EmployerHeader() {
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:pl-6 bg-foundItBg">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <nav className="flex items-center justify-between bg-foundItBg text-black p-4">
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dgjwhf8i3/image/upload/v1685793152/Screenshot_2023-06-03_172145_pfhklc.jpg"
              alt="Logo"
              className="w-auto h-6 mr-2"
            />
          </div>
        </nav>
      </div>
    </Navbar>
  );
}

export default EmployerHeader;
