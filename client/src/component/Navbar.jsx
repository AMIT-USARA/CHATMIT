import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO - ONLY IN THE CHAT PAGE */}
        {isChatPage && (
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80">
              <ShipWheelIcon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                ChatMit
              </span>
            </Link>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Link to={"/notifications"}>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
          </Link>

          {/* TODO - Theme selector */}
          {/* <ThemeSelector /> */}

          {/* User Avatar */}
          <div className="relative">
            <img
              src={authUser?.profilePic}
              alt="User Avatar"
              className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 object-cover"
            />
          </div>

          {/* Logout */}
          <button
            onClick={logoutMutation}
            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
          >
            <LogOutIcon className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
