import { Route, Routes } from "react-router-dom";
import Messenger from "../../pages/messenger/Messenger";

const MessengerRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Messenger isEmployer={true} />} />
      </Routes>
    </div>
  );
};

export default MessengerRouter;
