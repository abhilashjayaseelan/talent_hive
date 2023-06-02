import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../../pages/user/UserLoginPage";
import UserSignupPage from "../../pages/user/UserSignupPage";

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<UserLoginPage/>}/>
        <Route path="/register" element={<UserSignupPage/>} />
      </Routes>
    </div>
  );
};

export default UserRouter;
