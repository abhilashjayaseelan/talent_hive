import { Route, Routes } from "react-router-dom";
import UserMessenger from "../../pages/messenger/UserMessenger";
import EmployerHomePage from "../../pages/employer/EmployerHomePage";

const MessengerRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/user" element={<UserMessenger/>} />
        <Route path="/employer" element={<EmployerHomePage/>} />
      </Routes>
    </div>
  );
};

export default MessengerRouter;
