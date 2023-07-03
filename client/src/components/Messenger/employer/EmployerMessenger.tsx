import {format} from 'timeago.js';

type MessageType = {
  message: any;
  own: boolean;
};

function Message({ message, own }: MessageType) {
  return (
    <div className={`flex flex-col mt-3 ${own ? "items-end" : ""}`}>
      <div className="flex">
        <img
          className="mr-2 w-8 h-8 rounded-full object-cover"
          src="https://res.cloudinary.com/dgjwhf8i3/image/upload/v1687802064/Job-portal-profile/pexels-dominykas-4411214.jpg"
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
