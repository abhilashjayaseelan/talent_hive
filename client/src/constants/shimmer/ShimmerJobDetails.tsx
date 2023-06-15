import React from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

const ShimmerJobDetails: React.FC = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="p-4 rounded-lg bg-gray-100 animate-pulse">
        <div className="flex items-center mb-2">
          <BriefcaseIcon className="w-6 h-6 mr-2 bg-gray-300 rounded" />
        
        </div>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <div className="flex items-center mr-4">
            <MapPinIcon className="w-4 h-4 mr-1 bg-gray-300 rounded" />
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1 bg-gray-300 rounded" />
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
        {/* Rest of the component */}
        <div className="border-t border-gray-300 pt-4">
          {/* Rest of the component */}
        </div>
      </div>
      <div className="mt-2 w-ful h-5 bg-gray-100 rounded"></div>
      <div className="mt-2 w-ful h-5 bg-gray-100 rounded"></div>
      <div className="mt-2 w-ful h-5 bg-gray-100 rounded"></div>
      <div className="mt-2 w-ful h-5 bg-gray-100 rounded"></div>
      <div className="mt-2 w-ful h-5 bg-gray-100 rounded"></div>
      <div className="mt-2 w-ful h-5 bg-gray-100 rounded"></div>
      <div className="mt-2 w-ful h-5 bg-gray-100 rounded"></div>
    </div>
  );
};

export default ShimmerJobDetails;
