import React from "react";
import { Shimmer } from "react-shimmer";

function UserSideJobListingShimmer() {
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="flex w-full flex-wrap">
        <div className="w-full flex flex-wrap">
          <div className="lg:w-2/4 sm:w-2/4 p-4 sm:p-6 space-y-4">
            <Shimmer width={500} height={100} />
            <Shimmer width={500} height={100} />
            <Shimmer width={500} height={100} />
            <Shimmer width={500} height={100} />
            <Shimmer width={500} height={100} />
          </div>

          <div className="lg:w-2/4 sm:w-2/4 p-4 sm:p-6 bg-white">
            <Shimmer width={500} height={550} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSideJobListingShimmer;
