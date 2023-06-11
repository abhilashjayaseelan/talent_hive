import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegisterValidationSchema } from "../../../utils/validation";
import { SignupPayload } from "../../../types/PayloadInterface";
import { registerUser } from "../../../features/axios/api/userAuthentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function UserSignup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupPayload>({
    resolver: yupResolver(userRegisterValidationSchema),
  });

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });

  const submitHandler = async (formData: SignupPayload) => {
    registerUser(formData)
      .then((response: any) => {
        notify("User registered successfully", "success");

        setTimeout(() => {
          navigate("/user/login");
        }, 2000); 
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex justify-center items-center ">
        <div className="p-6 bg-white border border-gray-300 rounded shadow-lg mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Sign up</h2>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
              <label className="text-sm" htmlFor="email">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Phone
              </label>
              <input
                type="phone"
                placeholder="Phone"
                {...register("phone")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Password
              </label>
              <input
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
            <div>
              <label className="text-sm" htmlFor="email">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 flex justify-center items-center"
            >
              Sign up
            </button>
          </form>
          <div className="flex items-center justify-center mt-2">
            <a
              href="h"
              className="btn p-1 w-100 btn-light font-sm border border-transparent shadow-lg"
            >
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="icon-svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"
                    fill="#4285F4"
                  />
                  <path
                    d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="ml-2">Sign up using Google</span>
              </div>
            </a>
          </div>

          <div className="mt-4 text-center">
            <Link to={"/user/login"}>
              <span className="text-gray-500">
                Already have an account?
                <p className="text-purple-600 underline">Login</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
