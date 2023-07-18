import React, { useEffect, useState } from "react";
import configKeys from "../../../utils/config";
import axios from "axios";
import { UserDataPayload } from "../../../types/PayloadInterface";

function Conversations({ conversation, currentUser, onlineUsers }: any) {
  const [user, setUser] = useState<UserDataPayload>();
  const [isOnline, setIsOnline] = useState<boolean>(false);
  
  useEffect(() => {
    const senderId = conversation?.members?.find(
      (m: Array<string>) => m !== currentUser?._id
    );

    const getUser = async () => {
      try {
        const res = await axios(
          `${configKeys.API_URL}user/user-data/${senderId}`
        );
        setUser(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation.member, conversation?.members, currentUser?._id]);

  useEffect(() => {
    const onlineUser = onlineUsers?.filter((f: any) => f.userId === user?._id)
    if(onlineUser?.length > 0) {
      setIsOnline(true);
    }
  }, [onlineUsers, user?._id])

  return (
    <div className="flex items-center mt-5 p-3 cursor-pointer hover:bg-blue-gray-50 relative">
      <img
        className="mr-5 w-10 h-10 rounded-full object-cover"
        src={user?.image ?? '../user.jpg'}
        alt=""
      />
      <div className="flex flex-col">
        <span className="font-semibold">{user?.name}</span>
        { isOnline? <span className="text-gray-500">online</span> : <span className="text-gray-500">offline</span>}
      </div>
      { isOnline? <div className="absolute top-3 left-10 h-3 w-3 rounded-full bg-limeGreen"></div>: <div></div>}
    </div>
  );
}

export default Conversations;
