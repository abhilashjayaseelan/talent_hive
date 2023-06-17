import { FaChartBar, FaBriefcase, FaEnvelope, FaCog } from "react-icons/fa";
import AllJobsEmployer from "../components/Employer/Employer/AllJobsEmployer";

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
        // element: <AdminHomePage />,
      },
      {
        icon: <FaBriefcase {...icon} />,
        name: "Jobs",
        path: "/employer/all-jobs",
        // element: <AllJobsEmployer />,
      },
      {
        icon: <FaEnvelope {...icon} />,
        name: "Applications",
        path: "/employer/applications",
        // element: <AdminHomePage />,
      },
      {
        icon: <FaCog {...icon} />,
        name: "Settings",
        path: "/notifactions",
        // element: <AdminHomePage />,
      },
    ],
  },
];
