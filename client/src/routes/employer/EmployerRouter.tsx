import { Routes, Route } from "react-router-dom";
import EmployerLogin from "../../components/Employer/EmployerAuth/EmployerLogin";

const EmployerRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<EmployerLogin/>}/>
            </Routes>
        </div>
    )
}

export default EmployerRouter;
