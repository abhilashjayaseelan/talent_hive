import React from "react";
import UserHome from "../../components/HomePage/UserHome";
import UserHeader from "../../components/Header/UserHeader";
import UserSideFooter from "../../components/Footer/UserSideFooter";

function UserHomePage() {
  return (
    <div>
      <UserHeader />
      <UserHome />
      <UserSideFooter/>
    </div>
  );
}

export default UserHomePage;
