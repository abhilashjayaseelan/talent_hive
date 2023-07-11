import { Routes, Route } from "react-router-dom";
import EmployerLoginPage from "../../pages/employer/EmployerLoginPage";
import EmployerHomePage from "../../pages/employer/EmployerHomePage";
import EmailVerifyPage from "../../pages/employer/EmailVerifyPage";
import EmployerRegisterPage from "../../pages/employer/EmployerRegisterPage";
import EmailOTPPage from "../../pages/employer/EmailOTPPage";
import { useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";

const EmployerRouter = () => {
    const employerEmail = useSelector((state: RootState) => state.employerDetails.employerEmail);
    return (
        <div>
            <Routes>
                <Route path="/*" element ={<EmployerHomePage/>}/>
                <Route path="/login" element={<EmployerLoginPage/>}/>
                <Route path="/register" element={<EmailVerifyPage/>}/>
                <Route path="/register/form" element={employerEmail ? <EmployerRegisterPage/> : <EmailVerifyPage/>}/>
                <Route path="/register/OTP" element={employerEmail ? <EmailOTPPage/> : <EmailVerifyPage/>}/>
            </Routes>
        </div>
    )
}

export default EmployerRouter;
