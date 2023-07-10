import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routes/user/UserRouter";
import EmployerRouter from "./routes/employer/EmployerRouter";
import NotFound from "./components/Error/NotFound";
import HomeRouter from "./routes/home/HomeRouter";
import JobRouter from "./routes/jobs/JobRouter";
import ApplicationRouter from "./routes/applications/applicationRouter";
import MessengerRouter from "./routes/messenger/MessengerRouter";

function App() {
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          <Route path="/*" element={<HomeRouter />} />
          <Route path="/user/*" element={<UserRouter />} />
          <Route path="/employer/*" element={<EmployerRouter />} />
          <Route path="/job/*" element={<JobRouter />} />
          <Route path="/application/*" element={<ApplicationRouter />} />
          <Route path="/messenger/*" element={<MessengerRouter />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
