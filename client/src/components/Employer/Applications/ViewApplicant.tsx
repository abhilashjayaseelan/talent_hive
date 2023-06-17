import React, { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import ApplicationDetails from "../../../types/ApplicationsInterface";
import { applicationDetails } from "../../../features/axios/api/applicatons/applicationDetails";
import { useParams } from "react-router-dom";
import { Chip, Button } from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

function ViewApplicant() {
  const [applicationData, setApplicationData] = useState<ApplicationDetails>();
  const { id } = useParams();

  console.log(applicationData);

  useEffect(() => {
    const applications = async () => {
      const data = await applicationDetails(id ?? "");
      setApplicationData(data.applicationData);
    };
    applications();
  }, [id]);

  const handleStatusChange = (status: string) => {
    // Logic to update the application status
    console.log("New status:", status);
  };

  return (
    <div className="mx-auto max-w-screen-xl p-2 mt-4 rounded lg:pl-6">
      <div className="max-w-7xl p-6">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="flex justify-end mb-4">
          <Menu>
            <MenuHandler>
              <Button color="purple" size="sm">
                Change Status
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => handleStatusChange("Rejected")}>
                Reject
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange("Shortlisted")}>
                Shortlist
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {applicationData?.userId?.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Application for
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {applicationData?.jobId?.title}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {applicationData?.userId?.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Phone
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {applicationData?.userId?.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Application status
              </dt>
              <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <Chip
                  variant="ghost"
                  size="sm"
                  value={
                    applicationData?.applicationStatus === "Applied"
                      ? "Applied"
                      : applicationData?.applicationStatus === "Rejected"
                      ? "Rejected"
                      : "Shortlisted"
                  }
                  color={
                    applicationData?.applicationStatus === "Applied"
                      ? "green"
                      : applicationData?.applicationStatus === "Rejected"
                      ? "red"
                      : "orange"
                  }
                />
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                About
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Attachments
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          coverletter_back_end_developer.pdf
                        </span>
                        <span className="flex-shrink-0 text-gray-400">
                          4.5mb
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href="h"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default ViewApplicant;
