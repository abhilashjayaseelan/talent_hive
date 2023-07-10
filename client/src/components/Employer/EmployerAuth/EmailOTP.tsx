import React, { useState, useEffect } from 'react';

function EmailOTP() {
  const [timer, setTimer] = useState(120); 
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']); 

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

  const handleOtpChange = (index:any, value: any) => {
    // Update the OTP digit at the given index
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);
  };

  const handleOtpSubmit = () => {
    // Convert the OTP digits array to a string
    const otpString = otpDigits.join('');
    // Call the verify function with the OTP string
    verify(otpString);
  };

  const verify = (otp: string) => {
    // Call your verify function here with the OTP string
    console.log('Verifying OTP:', otp);
    // Implement the logic for verifying the OTP
  };

  return (
    <div className="h-screen py-20 px-3 mt-16">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="shadow-xl h-64 py-3 rounded text-center">
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
                    className="m-2 border border-purple-700 h-10 w-10 text-center form-control rounded"
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>

              <div className="flex justify-center text-center mt-5">
                {timer > 0 ? (
                  <p className="font-bold text-gray-500">
                    Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}
                    {timer % 60}
                  </p>
                ) : (
                  <a
                    className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"
                    onClick={handleOtpSubmit}
                  >
                    <span className="font-bold">Submit OTP</span>
                    <i className="bx bx-caret-right ml-1"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailOTP;
