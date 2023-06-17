import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
// import { useMaterialTailwindController, setOpenSidenav } from "../context";
import { ReactElement,useState } from "react";

interface Route {
  icon:ReactElement;
  name:string;
  path:string;
  // element:ReactElement
}

interface Routes {
  
  pages:Route[]
}

interface NavbarProps {
  routes:Routes[]
}

export function Sidenav({ routes }:NavbarProps) { 
//   const [controller, dispatch] = useMaterialTailwindController();
  const [selected,setSelected] = useState(true)
  const [openSidenav, setOpenSidenav] = useState(true)
  const sidenavType = 'white'
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };
  const handleClick = () =>{
    setSelected(true)
  }
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-10 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" size="sm" />
          <Typography
            variant="h6"
            color="black"
          >
            TalentHive
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
        //   onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }:any, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1 ">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }:Route) => (
              <li key={name}>
                <NavLink to={path}  >
                  {({ isActive}) => (
                    <Button
                    variant={isActive ? "gradient" : "text"}
                    color={isActive ? 'purple' : 'gray'}
                    className={`flex items-center gap-4 px-4 capitalize${isActive && selected ? " bg-gray-700" : ""}`}
                    fullWidth
                    onClick={handleClick}
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
                    >
                      {name}
                    </Typography>
                  </Button>
                  
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;