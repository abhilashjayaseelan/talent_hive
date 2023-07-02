import { Route, Routes } from "react-router-dom";
import UserMessenger from "../../pages/messenger/UserMessenger";

const MessengerRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/user" element={<UserMessenger/>} />
      </Routes>
    </div>
  );
};

export default MessengerRouter;
