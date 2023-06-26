import { useSelector, useDispatch } from "react-redux";
import { fetchAllUserApplications } from "../../../features/redux/slices/user/allApplicationSlice";
import ApplicationList from "./ApplicationList";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { useEffect, useState } from "react";
import { JobsInterface } from "../../../types/JobInterface";
import ApplicationStatus from "./ApplicationStatus";

function DisplayApplications() {
  const dispatch = useDispatch();
  const applications = useSelector((state: RootState) => state.userApplications.applications );
  const status = useSelector((state: RootState) => state.userApplications.status);
  const error = useSelector((state: RootState) => state.userApplications.error);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    dispatch(fetchAllUserApplications());
  }, [dispatch]);

  return (
    <div>
      <div className="mt-16 bg-gray-50 h-10 mx-auto max-w-screen-2xl rounded p-1 lg:pl-14">
        <h3 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-inherit antialiased">
          Application status
        </h3>
      </div>
      <div className=" px-4 sm:px-8 md:px-16 lg:px-32 flex flex-wrap min-h-screen">
        <div className="w-full lg:w-2/5 p-4 sm:p-6">
          <div
            className="overflow-y-auto p-6"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            {applications?.map((applications: JobsInterface) => (
              <ApplicationList
                key={applications._id}
                applications={applications}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
        </div>
        <div className="px-4 sm:px-8 md:px-16 flex flex-wrap min-h-screen">
          <div className="w-full sm:p-6">
            <div
              className="overflow-y-auto p-6 "
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              <ApplicationStatus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayApplications;
