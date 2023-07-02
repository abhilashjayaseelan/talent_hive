import React, { useEffect, useState } from "react";
import configKeys from "../../../utils/config";
import axios from "axios";
import { EmployerRegisterPayload } from "../../../types/PayloadInterface";

function Conversations({ conversation, currentUser }: any) {
  const [employer, setEmployer] = useState<EmployerRegisterPayload>();

  useEffect(() => {
    const senderId = conversation?.members?.find(
      (m: Array<string>) => m !== currentUser?._id
    );

    const getUser = async () => {
      try {
        const res = await axios(`${configKeys.API_URL}employer/employer-data/${senderId}`);
        setEmployer(res?.data)
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation.member, conversation?.members, currentUser?._id]);

  return (
    <div className="flex items-center mt-5 p-3 cursor-pointer hover:bg-blue-gray-50">
      <img
        className="mr-5 w-10 h-10 rounded-full object-cover"
        src={employer?.image}
        alt=""
      />
      <span className="font-semibold">{employer?.companyName}</span>
    </div>
  );
}

export default Conversations;
