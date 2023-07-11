import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { employerRegisterValidationSchema } from "../../../utils/validation";
import { registerEmployer } from "../../../features/axios/api/employer/employerAuthentication";
import { EmployerRegisterPayload } from "../../../types/PayloadInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";

function EmployerRegister() {
  const navigate = useNavigate();
  const employerEmail = useSelector((state: RootState) => state.employerDetails.employerEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployerRegisterPayload>({
    resolver: yupResolver(employerRegisterValidationSchema),
  });

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const submitHandler = async (formData: EmployerRegisterPayload) => {
    registerEmployer(formData)
      .then((response) => {
        notify("Registration success", "success");
        setTimeout(() => {
          navigate('/employer/login');
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
                className="mx-auto h-10 w-auto"
                src="https://res.cloudinary.com/dgjwhf8i3/image/upload/v1689059504/talentHive_cjcdcg.jpg"
                alt="Your Company"
            />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Company Name
              </label>
              <div className="mt-2">
                <input
                  id="companyName"
                  type="text"
                  maxLength={1}
                  placeholder="company Name"
                  {...register("companyName")}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Industry
              </label>
              <div className="mt-2">
                <input
                  id="industry"
                  type="text"
                  placeholder="Industry Name"
                  {...register("industry")}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                />
                {errors.industry && (
                  <p className="text-red-500 text-sm">
                    {errors.industry.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <input
                type="hidden"
                {...register("email")}
                defaultValue={employerEmail ?? ''}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <input
                  id="location"
                  type="text"
                  placeholder="Location"
                  {...register("location")}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="s"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account ?{" "}
            <Link to={"/employer/login"}>
              <span className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default EmployerRegister;
