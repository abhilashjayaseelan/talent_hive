import { Route, Routes } from "react-router-dom";
import UserMessenger from "../../pages/messenger/UserMessenger";
import EmployerMessenger from "../../pages/messenger/EmployerMessenger";

const MessengerRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/user" element={<UserMessenger/>} />
        <Route path="/employer" element={<EmployerMessenger/>} />
      </Routes>
    </div>
  );
};

export default MessengerRouter;
