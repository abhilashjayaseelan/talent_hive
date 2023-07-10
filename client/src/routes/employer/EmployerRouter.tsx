import { Routes, Route } from "react-router-dom";
import EmployerLoginPage from "../../pages/employer/EmployerLoginPage";
import EmployerHomePage from "../../pages/employer/EmployerHomePage";
import EmailVerifyPage from "../../pages/employer/EmailVerifyPage";

const EmployerRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element ={<EmployerHomePage/>}/>
                <Route path="/login" element={<EmployerLoginPage/>}/>
                <Route path="/register" element={<EmailVerifyPage/>}/>
            </Routes>
        </div>
    )
}

export default EmployerRouter;
