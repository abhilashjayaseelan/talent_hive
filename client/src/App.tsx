import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routes/user/UserRouter";
import EmployerRouter from "./routes/employer/EmployerRouter";
import NotFound from "./components/Error/NotFound";
import HomeRouter from "./routes/home/HomeRouter";
import NewJobRouter from "./routes/jobs/NewJobRouter";

function App() {
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          <Route path="/*" element ={<HomeRouter/>}/>
          <Route path="/user/*" element={<UserRouter />} />
          <Route path="/employer/*" element={<EmployerRouter />} />
          <Route path="/job/*" element= {<NewJobRouter/>} />
          <Route path="*" element= {<NotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
