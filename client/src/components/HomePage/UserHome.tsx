import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";

function UserHome() {
  
  const user = useSelector((state: RootState) => state.userDetails.userDetails);

  return (
    <div className="pt-20">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            user homePage
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
        </div>
      </main>
    </div>
  );
}

export default UserHome;
