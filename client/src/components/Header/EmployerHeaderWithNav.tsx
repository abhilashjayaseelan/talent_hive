import React, { useEffect, useState } from "react";
import { clearEmployerToken } from "../../features/redux/slices/employer/employerTokenSlice";
import { employerLogout } from "../../features/redux/slices/employer/employerDetailsSlice";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../features/redux/reducers/Reducer";
import { fetchEmployer } from "../../features/redux/slices/employer/employerDetailsSlice";

interface ProfileMenuItem {
  label: string;
  icon: React.ElementType;
}

const profileMenuItems: ProfileMenuItem[] = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const employer = useSelector((state: RootState) => state.employerDetails.employerDetails);

  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    dispatch(employerLogout());
    dispatch(clearEmployerToken());
    navigate('/');
  }

  useEffect(() => {
    dispatch(fetchEmployer());
  }, [dispatch]);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src={employer?.employerData?.image ?? "../user.jpg"}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={label === 'Sign Out' ? () => {handleLogout()} : closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function EmployerHeaderWithNav() {
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <ProfileMenu />
      </div>
    </Navbar>
  );
}
