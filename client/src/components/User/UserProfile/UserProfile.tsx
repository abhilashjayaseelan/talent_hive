import React, { useEffect, useState } from "react";
import { userData } from "../../../features/axios/api/user/userDetails";
import { UserInterface } from "../../../types/UserInterface";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { deleteResume } from "../../../features/axios/api/user/userDetails";
import ConfirmResumeDelete from "./ConfirmResumeDelete";
import AddResume from "./AddResumeModal";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  PencilIcon,
  PaperClipIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

function UserProfile() {
  const [userDetails, setUserDetails] = useState<UserInterface>({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [resumeDeleted, setResumeDeleted] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showResumeUpload, setResumeUpload] = useState(false);


  useEffect(() => {
    const userInfo = async () => {
      const data = await userData();
      setUserDetails(data);
    };
    userInfo();
  }, [resumeDeleted, isUploaded]);

  const resumeUploadButtonHandle = () => {
    setResumeUpload(true);
  };

  const deleteButtonHandle = () => {
    setShowDeleteConfirmation(true);
  };

  return (
    <div className="pl-16 pr-16 pt-10">
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-purple-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 shadow-lg shadow-gray-400">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={userDetails?.image ?? ""}
                alt="img"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {userDetails?.name ?? ""}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {userDetails?.profession ?? ""}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-4 px-4 lg:grid-cols-2 xl:grid-cols-1">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <div className="flex gap-x-3">
                Profile Information
                <Link to={"/user/edit-profile"}>
                  <Tooltip content="Edit Profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-500" />
                  </Tooltip>
                </Link>
              </div>
            </Typography>
            <hr className="my-1 border-blue-gray-50" />
            <div>
              <CardBody className="p-0">
                <ul className="flex flex-col gap-4 p-0">
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Name:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {userDetails?.name ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Email:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {userDetails?.email ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Location:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {userDetails?.location ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      About:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {userDetails?.about ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Resume:
                    </Typography>

                    {userDetails?.resume ? (
                      <div className="rounded-md border border-gray-300 p-1 lg:w-80">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500 flex gap-x-2"
                        >
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          "Your resume.pdf"
                          <Tooltip content={"Update Resume"}>
                            <button onClick={() => resumeUploadButtonHandle()}>
                              <PencilIcon
                                className="ml-20 h-5 w-5 flex-shrink-0 text-blue-400"
                                aria-hidden="true"
                              />
                            </button>
                          </Tooltip>
                          <Tooltip content="Delete Resume">
                            <button onClick={() => deleteButtonHandle()}>
                              <TrashIcon
                                className="ml-2 h-5 w-5 flex-shrink-0 text-red-400"
                                aria-hidden="true"
                              />
                            </button>
                          </Tooltip>
                        </Typography>
                      </div>
                    ) : (
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500 flex gap-x-2"
                      >
                        <Tooltip content={"Add resume"}>
                          <Button
                            variant="text"
                            onClick={() => resumeUploadButtonHandle()}
                          >
                            Add
                          </Button>
                        </Tooltip>
                      </Typography>
                    )}
                  </li>
                </ul>
              </CardBody>
            </div>
          </div>
        </CardBody>
      </Card>

      {showDeleteConfirmation && (
        <ConfirmResumeDelete
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={() => deleteResume()}
          isDeleted={() => setResumeDeleted(!resumeDeleted)}
        />
      )}
      <div className="z-10">
        {showResumeUpload && (
          <AddResume
            isOpen={showResumeUpload}
            onClose={() => setResumeUpload(false)}
            setIsUploaded={()=> setIsUploaded(!isUploaded)}
          />
        )}
      </div>
      <ToastContainer className="z-50"/>
    </div>
  );
}

export default UserProfile;
