import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

const Layout = ({ children, showSidebar = true }) => {
  return (
    <div className="flex min-h-screen h-screen">
      {/* Sidebar (optional) */}
      {showSidebar && <Sidebar />}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
