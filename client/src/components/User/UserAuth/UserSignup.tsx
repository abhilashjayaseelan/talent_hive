import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegisterValidationSchema } from "../../../utils/validation";
import { SignupPayload } from "../../../types/PayloadInterface";
import { registerUser } from "../../../features/axios/api/user/userAuthentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuthComponent from "./GoogleAuthComponent";

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
    <div className="bg-slate-100 flex justify-center items-center h-screen ">
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
          <span className="mr-2 flex justify-center">or</span>
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-center mt-2">
              <GoogleAuthComponent />
            </div>
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
