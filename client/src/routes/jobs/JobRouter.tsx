import { Route, Routes } from "react-router-dom";
import AddNewJob from "../../pages/employer/AddNewJob";
import EditJobPage from "../../pages/employer/EditJobPage";
import DisplayJobPage from "../../pages/user/UserSideDisplayJobPage";
import ViewJobPage from "../../pages/employer/ViewJobPage";

const JobRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/create-job" element= {<AddNewJob/>} />
                <Route path="/edit-job/:id" element= {<EditJobPage/>} />
                <Route path="/all-jobs" element={<DisplayJobPage/>} />
                <Route path="/view-job" element={<ViewJobPage/>} />
            </Routes>
        </div>
    )
}

export default JobRouter;