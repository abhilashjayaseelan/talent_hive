import React from "react";

function EmployerHeader() {
  return (
    <nav className="flex items-center justify-between bg-foundItBg text-black p-4">
      <div className="flex items-center">
        <img
          src="https://res.cloudinary.com/dgjwhf8i3/image/upload/v1685793152/Screenshot_2023-06-03_172145_pfhklc.jpg"
          alt="Logo"
          className="w-auto h-8 mr-2"
        />
      </div>
      <ul className="flex items-center space-x-4">
       
        <li>
          <a href="/logout" className="hover:text-gray-300">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default EmployerHeader;
