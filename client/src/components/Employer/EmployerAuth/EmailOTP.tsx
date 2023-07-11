import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OTPVerify } from "../../../features/axios/api/employer/employerAuthentication";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function EmailOTP() {
  const [timer, setTimer] = useState(120);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const inputRefs = useRef<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Start the timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    // Clear the interval when the timer reaches 0
    if (timer === 0) {
      clearInterval(interval);
    }
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [timer]);

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const handleOtpChange = (index: any, value: any) => {
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);

    if (value !== "" && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index: any, event: any) => {
    if (event.key === "Backspace" && index > 0 && otpDigits[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = async () => {
    const otpString = otpDigits.join("");
    try {
      setSubmitted(true);
      const response = await OTPVerify(otpString);
      if (response) {
        setTimeout(() => {
          notify("Email verified", "success");
        }, 1500);
        setTimeout(() => {
          navigate('/employer/register/form')
        }, 3000);
      }
    } catch (error: any) {
      setTimeout(() => {
        notify(error.message, "error");
        setSubmitted(false)
      }, 1500);
    }
  };

  return (
    <div className="h-screen py-20 px-3 mt-16">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="shadow-xl h-11/12  py-3 rounded text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <span className="font-bold">your email</span>
              </div>

              <div
                id="otp"
                className="flex flex-row justify-center text-center px-2 mt-5"
              >
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="m-2 border border-purple-700 h-10 w-10 text-center form-control rounded"
                    type="number"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>

              <div className="flex justify-center text-center mt-5">
                {timer > 0 ? (
                  <div className="flex items-center flex-col">
                    <p className="font-bold text-gray-500">
                      Time Remaining: {Math.floor(timer / 60)}:
                      {timer % 60 < 10 ? "0" : ""}
                      {timer % 60}
                    </p>
                    {!submitted ? (
                      <button
                        className=" btn p-1 w-3/4 mt-2 text-sm items-center text-white cursor-pointer bg-purple-600 rounded-lg"
                        onClick={handleOtpSubmit}
                      >
                        Submit
                      </button>
                    ) : (
                      <Spinner />
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EmailOTP;
