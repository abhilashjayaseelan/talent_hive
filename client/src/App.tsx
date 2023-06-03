import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routes/user/UserRouter";
import EmployerRouter from "./routes/employer/EmployerRouter";

function App() {
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          <Route path="/user/*" element={<UserRouter />} />
          <Route path="/employer/*" element={<EmployerRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
