import { GiHamburgerMenu } from "react-icons/gi";
import LoadingBar from "react-top-loading-bar";
import { Dropdown, MenuProps, message } from "antd";
import ButtonDefault from "../button/button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar({
  onClickHamburger,
  isSidebarOpen,
  progress,
  setProgress,
}: any) {
  const navigate = useNavigate();

  const nama = atob(Cookies.get("nama")|| "")

  const handleLogout = () => {
    message.success("Logout Berhasil!");
    Cookies.remove("token");
    Cookies.remove("nama");
    Cookies.remove("nrp");

    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="w-[100%]">
          <ButtonDefault
            text={"Logout"}
            className="w-full h-full"
            onClick={handleLogout}
          />
        </div>
      ),
    },
  ];

  return (
    <header className="z-20 w-full h-16 fixed top-0 flex justify-center">
      <div className="h-full w-full max-w-[85rem] bg-white items-center relative">
        <div className="md:hidden flex items-center w-10 h-full left-0 justify-center absolute">
          <GiHamburgerMenu
            onClick={onClickHamburger}
            className={`cursor-pointer ${
              isSidebarOpen ? "text-black" : "text-gray-500"
            } transition-colors duration-300 ease-in-out`}
          />
        </div>

        <div className="ml-[2.5rem] md:ml-0 w-full h-full flex items-center justify-start md:justify-center relative">
          <div className="hidden md:block absolute right-5">
            <Dropdown menu={{ items }}>
              <p className="text-base font-semibold">
                Hello, {nama}!
              </p>
            </Dropdown>
          </div>
        </div>
      </div>

      <LoadingBar
        color="#3b82f6"
        height={7}
        shadow={true}
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => {
          setProgress(0);
        }}
      />
    </header>
  );
}

export default Navbar;
