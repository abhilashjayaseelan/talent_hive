import { Route, Routes } from "react-router-dom";
import AddNewJob from "../../pages/employer/AddNewJob";
import EditJobPage from "../../pages/employer/EditJobPage";

const NewJobRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/create-job" element= {<AddNewJob/>} />
                <Route path="/edit-job" element= {<EditJobPage/>} />
            </Routes>
        </div>
    )
}

export default NewJobRouter;