import { Routes, Route } from "react-router-dom";
import EmployerLoginPage from "../../pages/employer/EmployerLoginPage";
import EmployerHomePage from "../../pages/employer/EmployerHomePage";
import EmailVerifyPage from "../../pages/employer/EmailVerifyPage";
import EmployerRegisterPage from "../../pages/employer/EmployerRegisterPage";
import EmailOTPPage from "../../pages/employer/EmailOTPPage";

const EmployerRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element ={<EmployerHomePage/>}/>
                <Route path="/login" element={<EmployerLoginPage/>}/>
                <Route path="/register" element={<EmailVerifyPage/>}/>
                <Route path="/register/form" element={<EmployerRegisterPage/>}/>
                <Route path="/register/OTP" element={<EmailOTPPage/>}/>
            </Routes>
        </div>
    )
}

export default EmployerRouter;
