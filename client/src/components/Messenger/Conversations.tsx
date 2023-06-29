import React from "react";

function Conversations() {
  return (
    <div className="flex items-center mt-5 p-3 cursor-pointer hover:bg-blue-gray-50">
      <img
        className="mr-5 w-10 h-10 rounded-full object-cover"
        src="https://res.cloudinary.com/dgjwhf8i3/image/upload/v1687802064/Job-portal-profile/pexels-dominykas-4411214.jpg"
        alt=""
      />
      <span className="font-semibold">John Doe</span>
    </div>
  );
}

export default Conversations;
