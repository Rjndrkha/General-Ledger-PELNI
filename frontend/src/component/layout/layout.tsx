import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/footer";
import SideMenu, { getMenuItems, MenuItem } from "../menu/menu";
import { menuItemsUser } from "../menu/listMenu";
import Dashboard from "../../page/dashboard";

function LayoutUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    setProgress(40);
    setShowSidebar(location.pathname !== "/");
    setTimeout(() => setProgress(100), 300);
  }, [location.pathname]);

  const items = getMenuItems(menuItemsUser);

  return (
    <>
      <Navbar
        onClickHamburger={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        progress={progress}
        setProgress={setProgress}
      />
      <div className="mt-16 w-full min-h-[100vh] flex justify-center">
        <main className="w-full max-w-[85rem] flex flex-col md:flex-row relative border">
          {showSidebar ? (
            <>
              <section
                className={`z-10 h-full w-full md:w-[10rem] lg:w-[15rem] absolute left-0 ${
                  isSidebarOpen ? "translate-x-0 w-[80%]" : "-translate-x-full"
                } md:translate-x-0 transition-transform duration-300 ease-in-out`}
              >
                <SideMenu items={items} menuItems={menuItemsUser} />
              </section>

              <section className="w-full md:ml-[10rem] lg:ml-[16rem] relative">
                <Outlet />
              </section>
            </>
          ) : (
            <div className="h-full w-full p-5">
              <Dashboard />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default LayoutUser;

function SidebarLink() {
  return (
    <div className="bg-red-950 left-0 h-full w-full">
      <h1 className="text-lg text-blue-500">Sidebar</h1>
      <a href="/page1" className="text-white">
        Page 1
      </a>
    </div>
  );
}
