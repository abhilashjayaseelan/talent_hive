import { FaChartBar, FaBriefcase, FaEnvelope, FaFacebookMessenger, FaUser } from "react-icons/fa";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const NavRoutes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <FaChartBar {...icon} />,
        name: "dashboard",
        path: "/employer/dashboard",
      },
      {
        icon: <FaBriefcase {...icon} />,
        name: "Jobs",
        path: "/employer/all-jobs",
      },
      {
        icon: <FaEnvelope {...icon} />,
        name: "Applications",
        path: "/employer/applications",
      },
      {
        icon: <FaFacebookMessenger {...icon} />,
        name: "Chats",
        path: "/employer/messenger",
      },
      {
        icon: <FaUser {...icon} />,
        name: "Profile",
        path: "/employer/profile",
      },
    ],
  },
];
