import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../../pages/user/UserLoginPage";
import UserSignupPage from "../../pages/user/UserSignupPage";
import UserHomePage from "../../pages/user/UserHomePage";

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/register" element={<UserSignupPage />} />
      </Routes>
    </div>
  );
};

export default UserRouter;
