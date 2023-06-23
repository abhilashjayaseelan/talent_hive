import UserProfile from "../../components/User/UserProfile/UserProfile";
import UserHeader from "../../components/Header/UserHeader";
import UserSideFooter from "../../components/Footer/UserSideFooter";

const UserProfilePage = () => {
  return (
    <>
      <UserHeader />
      <UserProfile />
      <UserSideFooter />
    </>
  );
};

export default UserProfilePage;
