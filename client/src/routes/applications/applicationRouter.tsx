import { Route, Routes } from "react-router-dom";
import ViewApplicantPage from "../../pages/applications/ViewApplicantPage";

const applicationRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/view-applicant/:id" element = {<ViewApplicantPage/>} />
            </Routes>
        </div>
    );
};

export default applicationRouter;