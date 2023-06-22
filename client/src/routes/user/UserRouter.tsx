import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../../pages/user/UserLoginPage";
import UserSignupPage from "../../pages/user/UserSignupPage";
import UserHomePage from "../../pages/user/UserHomePage";
import UserProfilePage from "../../pages/user/UserProfilePage";

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/register" element={<UserSignupPage />} />
        <Route path="/profile" element={<UserProfilePage/>} />
      </Routes>
    </div>
  );
};

export default UserRouter;
