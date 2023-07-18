import axios from 'axios';
import { useEffect, useState } from 'react';
import {format} from 'timeago.js';
import configKeys from '../../../utils/config';

type MessageType = {
  message: any;
  own: boolean;
  id: string;
};

function Message({ message, own , id}: MessageType) {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (own) {
          const res = await axios(`${configKeys.API_URL}user/user-data/${id}`);
          setUser(res?.data);
        } else {
          const res = await axios(`${configKeys.API_URL}employer/employer-data/${id}`);
          setUser(res?.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [id, own]);
  return (
    <div className={`flex flex-col mt-3 ${own ? "items-end" : ""}`}>
      <div className="flex">
        <img
          className="mr-2 w-8 h-8 rounded-full object-cover"
          src= {user?.image ?? '../user.jpg'}
          alt=""
        />
        <p
          className={`p-3 rounded-3xl max-w-xs ${
            own ? "bg-gray-300 text-black" : "bg-purple-600 text-white"}`}
        >
          {message?.text}
        </p>
      </div>
      <div className="text-xs mt-2">{format(message?.createdAt)}</div>
    </div>
  );
}

export default Message;
