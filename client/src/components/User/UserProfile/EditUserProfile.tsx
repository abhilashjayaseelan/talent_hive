import React, { useEffect, useState } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../../types/UserInterface";
import { userData } from "../../../features/axios/api/user/userDetails";
import { updateUser } from "../../../features/axios/api/user/userDetails";
import { Avatar } from "@material-tailwind/react";

function EditUserProfile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserInterface | undefined>();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    async function getUserData() {
      const data = await userData();
      setUserDetails(data);
    }
    getUserData();
  }, []);

  const { register, handleSubmit, setValue } = useForm<UserInterface>({});

  useEffect(() => {
    if (userDetails) {
      setValue("name", userDetails?.name);
      setValue("email", userDetails?.email);
      setValue("location", userDetails?.location);
      setValue("about", userDetails?.about);
      setValue("profession", userDetails?.profession);  
    }
  }, [userDetails]);

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImg(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (formData: UserInterface) => {
    const imageFile = formData.image[0];
    const updatedFormData = {...formData, image: imageFile}
    updateUser(updatedFormData)
      .then((response) => {
        notify("Data updated successfully", "success");
        setTimeout(() => {
          navigate("/user/profile");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return (
    <>
      <div className="pt-16 pl-40">
        <Breadcrumbs className="bg-white">
          <a href="#" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <a href="#" className="opacity-60">
            <span>Profile</span>
          </a>
          <a href="#">Edit profile</a>
        </Breadcrumbs>
      </div>
      <div className=" mx-auto max-w-screen-xl p-2 mt-4 rounded lg:pl-6">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <Avatar
                      src={selectedImg || userDetails?.image}
                      alt="image"
                      size="lg"
                      className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                    />
                    <input 
                    type="file"
                    id="user-profile"
                    accept=".jpg, .jpeg, .png"
                    {...register("image")}
                    onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="profession"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profession
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="profession"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("profession")}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    User name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="name"
                      required
                      {...register("name")}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                      {...register("email")}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Location / address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="location"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("location")}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("about")}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Your profile summary should mention the highlights of your
                    career and education, what your professional interests are,
                    and what kind of a career you are looking for
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default EditUserProfile;
