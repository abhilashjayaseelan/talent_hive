import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routes/user/UserRouter";

function App() {
  return (
    <div className="font-roboto">
      <Router>
        <Routes>
          <Route path="/user/*" element={<UserRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
