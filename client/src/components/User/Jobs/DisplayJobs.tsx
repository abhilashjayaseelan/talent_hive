import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../../../features/redux/slices/getAllJobsSlice";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { JobsInterface } from "../../../types/JobInterface";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import { distinctTitleLocationSalary } from "../../../features/axios/api/user/jobDetails";
import {
  Navbar,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

function DisplayJobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.allJobs.jobs);
  const status = useSelector((state: RootState) => state.allJobs.status);
  const error = useSelector((state: RootState) => state.allJobs.error);
  const [selected, setSelected] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [titles, setTitles] = useState([]);
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  useEffect(() => {
    distinctTitleLocationSalary("location", setLocations);
    distinctTitleLocationSalary("title", setTitles);
    distinctTitleLocationSalary("salary", setSalaries);
  }, []);

  const filterJobs = jobs?.filter(
    (job: JobsInterface) =>
      job?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job?.location?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job?.employmentType?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="pt-16 fixed w-full">
        <Navbar className="mx-auto max-w-screen-2xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
            <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                label="Search here..."
                color="purple"
                className="pr-20"
                containerProps={{
                  className: "min-w-[288px]",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* <Button
                size="sm"
                className="!absolute right-1 top-1 rounded"
                color="purple"
              >
                Search
              </Button> */}
            </div>
            <div className="w-52">
              <Select label="Location" color="purple">
                {locations.map((location) => (
                  <Option key={location}>{location}</Option>
                ))}
              </Select>
            </div>
            <div className="w-52">
              <Select label="Salary" color="purple">
                {salaries.map((salary) => (
                  <Option key={salary}>{salary}</Option>
                ))}
              </Select>
            </div>
            <div className="w-52">
              <Select label="Role" color="purple">
                {titles.map((role) => (
                  <Option key={role}>{role}</Option>
                ))}
              </Select>
            </div>
            <Button
              size="sm"
              className="!absolute right-1 rounded"
              color="purple"
            >
              Filter
            </Button>
            <div className="w-20"></div>
          </div>
        </Navbar>
      </div>
      <div className="pt-28 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-wrap min-h-screen">
        <div className="w-full sm:w-2/4 p-4 sm:p-6">
          <div
            className="overflow-y-auto p-6"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            {jobs &&
              filterJobs?.map((job: JobsInterface) => (
                <JobList
                  key={job._id}
                  jobs={job}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
          </div>
        </div>
        <div className="w-full sm:w-2/4 p-4 sm:p-6 bg-white">
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            <JobDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayJobs;
