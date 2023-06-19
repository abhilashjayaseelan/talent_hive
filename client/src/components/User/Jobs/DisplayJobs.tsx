import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../../../features/redux/slices/getAllJobsSlice";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { JobsInterface } from "../../../types/JobInterface";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import {
  distinctTitleLocationSalary,
  filterJobs,
} from "../../../features/axios/api/user/jobDetails";
import { Navbar, Button, Input } from "@material-tailwind/react";

function DisplayJobs(this: any) {
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.allJobs.jobs);
  const status = useSelector((state: RootState) => state.allJobs.status);
  const error = useSelector((state: RootState) => state.allJobs.error);
  // variable for job selection ring
  const [selected, setSelected] = useState("");
  // variables for search searching
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [titles, setTitles] = useState([]);
  const [salaries, setSalaries] = useState([]);
  // variables for filtering
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  
  const [filtered, setFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  useEffect(() => {
    distinctTitleLocationSalary("location", setLocations);
    distinctTitleLocationSalary("title", setTitles);
    distinctTitleLocationSalary("salary", setSalaries);
  }, []);

  const filterJob = jobs?.filter(
    (job: JobsInterface) =>
      job?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job?.location?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      job?.employmentType?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const handleFilter = async () => {
    const filteredJobs = await filterJobs(
      selectedTitle,
      selectedLocation,
      selectedSalary
    );
    setFiltered(filteredJobs)
    setIsFiltered(true);
  };
  console.log(jobs)

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
            </div>
            <div className="sm:col-span-1">
              <select
                className="focus:ring-2 focus:ring-purple-600 border-2 rounded-lg py-2 px-4 text-gray-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1">
              <select
                className="focus:ring-2 focus:ring-purple-600 border-2 rounded-lg py-2 px-4 text-gray-500"
                value={selectedSalary}
                onChange={(e) => setSelectedSalary(e.target.value)}
              >
                <option value="">Select salary</option>
                {salaries.map((salary) => (
                  <option key={salary} value={salary}>
                    {salary}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1">
              <select
                className="focus:ring-2 focus:ring-purple-600 border-2 rounded-lg py-2 px-4 text-gray-500"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
              >
                <option value="">Select Role</option>
                {titles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <Button
              size="sm"
              className="!absolute right-1 rounded"
              color="purple"
              onClick={() => handleFilter()}
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
            {isFiltered ? (
              filtered.map((job: JobsInterface) => (
                <JobList
                  key={job._id}
                  jobs={job}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))
            ) : (
              filterJob?.map((job: JobsInterface) => (
                <JobList
                  key={job._id}
                  jobs={job}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))
            )}
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
