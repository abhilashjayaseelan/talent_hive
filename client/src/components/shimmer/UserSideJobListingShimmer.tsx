import React from "react";
import { Shimmer } from "react-shimmer";

function UserSideJobListingShimmer() {
  return (
    <div className="w-full sm:w-2/4 p-4 sm:p-6">
      <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-2/4 p-4 sm:p-6 space-y-4">
            <Shimmer width={400} height={100} />
            <Shimmer width={400} height={100} />
            <Shimmer width={400} height={100} />
            <Shimmer width={400} height={100} />
            <Shimmer width={400} height={100} />
          </div>

          <div className="w-full sm:w-2/4 p-4 sm:p-6 bg-white">
            <Shimmer width={400} height={400} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSideJobListingShimmer;
