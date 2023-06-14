import { Route, Routes } from "react-router-dom";
import AddNewJob from "../../pages/employer/AddNewJob";
import EditJobPage from "../../pages/employer/EditJobPage";
import DisplayJobPage from "../../pages/jobs/DisplayJobPage";

const JobRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/create-job" element= {<AddNewJob/>} />
                <Route path="/edit-job/:id" element= {<EditJobPage/>} />
                <Route path="/all-jobs" element={<DisplayJobPage/>} />
            </Routes>
        </div>
    )
}

export default JobRouter;