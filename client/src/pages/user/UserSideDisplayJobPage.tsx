import React from "react";
import DisplayJobs from "../../components/User/Jobs/DisplayJobs";
import UserHeader from "../../components/Header/UserHeader";
import UserSideFooter from "../../components/Footer/UserSideFooter";

function DisplayJobPage() {
  return (
    <>
      <UserHeader />
      <DisplayJobs />
      <UserSideFooter />
    </>
  );
}

export default DisplayJobPage;
