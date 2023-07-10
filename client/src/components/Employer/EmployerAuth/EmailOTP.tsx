import React from "react";

function EmailOTP() {
  return (
    <div className="h-screen bg-blue-500 py-20 px-3">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="bg-white h-64 py-3 rounded text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <span className="font-bold">your email</span>
              </div>

              <div
                id="otp"
                className="flex flex-row justify-center text-center px-2 mt-5"
              >
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="first"
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="second"
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="third"
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="fourth"
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="fifth"
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="sixth"
                />
              </div>

              <div className="flex justify-center text-center mt-5">
                <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                  <span className="font-bold">Resend OTP</span>
                  <i className="bx bx-caret-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailOTP;
