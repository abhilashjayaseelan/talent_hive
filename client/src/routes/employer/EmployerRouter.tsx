import { Routes, Route } from "react-router-dom";
import EmployerLoginPage from "../../pages/employer/EmployerLoginPage";
import EmployerRegisterPage from "../../pages/employer/EmployerRegisterPage";

const EmployerRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<EmployerLoginPage/>}/>
                <Route path="/register" element={<EmployerRegisterPage/>}/>
            </Routes>
        </div>
    )
}

export default EmployerRouter;
