import UserHeader from "../../components/Header/UserHeader";
import EmployerHeader from "../../components/Header/EmployerHeader";
import UserSideFooter from "../../components/Footer/UserSideFooter";
import Conversations from "../../components/Messenger/Conversations";
import Message from "../../components/Messenger/Message";
import { Tooltip } from "@material-tailwind/react";
import { IoPaperPlaneSharp } from "react-icons/io5";
import ChatOnline from "../../components/Messenger/ChatOnline";

type MessengerProps = {
  isEmployer: boolean;
};

function Messenger({ isEmployer }: MessengerProps) {
  return (
    <div>
      {isEmployer ? <EmployerHeader /> : <UserHeader />}
      <div className="h-screen pb-[70px] flex mx-auto max-w-screen-xl p-2 mt-4 rounded">
        <div className="flex-auto p-3">
          <div>
            <input
              className="w-5/6 p-3 border-b border-solid border-gray-500 focus:outline-none"
              placeholder="Search User"
              type="text"
            />
            <div className="h-96 overflow-y-auto">
              <Conversations />
              <Conversations />
              <Conversations />
              <Conversations />
            </div>
          </div>
        </div>

        <div className="flex-auto p-3 w-64">
          <div className="flex flex-col justify-between h-full">
            <div className="pr-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
              <Message own={false} />
              <Message own={true} />
              <Message own={false} />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <textarea
                className="w-10/12 h-24 p-3 focus:outline-none"
                placeholder="Write something..."
              />
              <Tooltip content="Send">
                <button className="text-3xl text-blue-600">
                  <IoPaperPlaneSharp />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="flex-auto p-3">
          <div>
            <ChatOnline/>
          </div>
        </div>
      </div>
      {isEmployer ? <div>employer footer</div> : <UserSideFooter />}
    </div>
  );
}

export default Messenger;
