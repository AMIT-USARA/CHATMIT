import { Link, useLocation } from "react-router-dom"; 
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const linkBase =
    "flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition";
  const activeLink =
    "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-medium";

  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-900 shadow-md flex flex-col justify-between sticky top-0">
      {/* LOGO */}
      <div className="p-6 flex items-center space-x-2">
        <ShipWheelIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
        <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
          ChatMit
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col space-y-2 px-4 h-[80%]">
        <Link
          to="/"
          className={`${linkBase} ${currentPath === "/" ? activeLink : ""}`}
        >
          <HomeIcon className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`${linkBase} ${
            currentPath === "/friends" ? activeLink : ""
          }`}
        >
          <UsersIcon className="w-5 h-5" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`${linkBase} ${
            currentPath === "/notifications" ? activeLink : ""
          }`}
        >
          <BellIcon className="w-5 h-5" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <img
            src={authUser?.profilePic}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
              {authUser?.fullName}
            </p>
            <p className="text-xs text-green-500 flex items-center space-x-1">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Online</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
