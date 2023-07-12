import UserHeader from "../../components/Header/UserHeader";
import UserSideFooter from "../../components/Footer/UserSideFooter";
import Conversations from "../../components/Messenger/user/UserConversations";
import Message from "../../components/Messenger/user/UserMessage";
import { Tooltip } from "@material-tailwind/react";
import { IoPaperPlaneSharp } from "react-icons/io5";
import { fetchUser } from "../../features/redux/slices/user/userDetailsSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";
import { getUserConversations } from "../../features/axios/api/messenger/conversation";
import { io, Socket } from "socket.io-client";
import configKeys from "../../utils/config";
import {
  getUserMessages,
  postUserMessages,
} from "../../features/axios/api/messenger/messages";

function Messenger() {
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useRef<Socket | null>(null);
  const user = useSelector(
    (state: RootState) => state?.userDetails?.userDetails
  );
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [messages, setMessages] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<any>("");
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>([]);

  useEffect(() => {
    socket.current = io(configKeys.SOCKET_PORT);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data?.senderId,
        text: data?.text,
        createdAt: Date.now(),
      });
    });
  },[]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current?.emit("addUser", user?._id);
    socket?.current?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user?._id]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const getConversations = async () => {
      if (user) {
        const res = await getUserConversations(user?._id);
        setConversations(res);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const res = await getUserMessages(currentChat?._id);
          setMessages(res);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat?._id,
      sender: user?._id,
      text: newMessage,
    };

    const receiverId = currentChat?.members?.find(
      (member: any) => member !== user._id
    );

    socket?.current?.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await postUserMessages(message);
      setMessages([...messages, res]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <UserHeader />
      <div className="pt-16 h-screen pb-[70px] flex mx-auto max-w-screen-xl p-2 mt-4 rounded">
        <div className="flex-auto p-3">
          <div>
            <input
              className="w-5/6 p-3 border-b border-solid border-gray-500 focus:outline-none"
              placeholder="Search User"
              type="text"
            />
            <div className="h-96 overflow-y-auto">
              {conversations?.map((c, index) => (
                <div onClick={() => setCurrentChat(c)} key={index}>
                  <Conversations
                    conversation={c}
                    currentUser={user}
                    onlineUsers={onlineUsers}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-auto p-3 w-64">
          <div className="flex flex-col justify-between h-full relative">
            {currentChat ? (
              <>
                <div className="pr-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                  {messages?.map((msg: any, index: any) => (
                    <div key={index} ref={scrollRef}>
                      <Message
                        message={msg}
                        own={msg?.sender === user?._id}
                        id={msg?.sender}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <textarea
                    className="w-10/12 h-24 p-3 focus:outline-none"
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write something..."
                    value={newMessage}
                  />
                  <Tooltip content="Send">
                    <button
                      onClick={handleSubmit}
                      className="text-3xl text-blue-600"
                    >
                      <IoPaperPlaneSharp />
                    </button>
                  </Tooltip>
                </div>
              </>
            ) : (
              <span className="absolute top-10 text-4xl text-gray-400 cursor-default ">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>

        <div className="flex-auto p-3"></div>
      </div>
      <UserSideFooter />
    </div>
  );
}

export default Messenger;
