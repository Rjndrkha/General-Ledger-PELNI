import React, { useEffect } from "react";
import CardComponent from "../../component/card/card";
import DashboardClient from "../../service/dashboard/PortalClient";
import { message } from "antd";
import { IMenuAccess } from "../../interface/IMenuAccess";
import Cookies from "js-cookie";

function Dashboard() {
  const [menu, setMenu] = React.useState<IMenuAccess[]>([]);
  const token = Cookies.get("token") || "";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { response } = await DashboardClient.GetMenuAccess({}, token);

    if (response) {
      setMenu(response.data);
      Cookies.set("menu", JSON.stringify(response.data), { expires: 1 });
    }

    if (!response) {
      message.error(response?.message || "Failed to get data");
    }
  };
  return (
    <>
      <section className="flex flex-col gap-3">
        <div>
          <h1 className="text-base font-bold text-blue-950">List Of</h1>
          <h1 className="font-extrabold text-blue-950">
            Enterprise Application
          </h1>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menu.map((item, index) => (
            <CardComponent
              key={index}
              href={item.link}
              imgAlt="Image-Menu"
              imgSrc={item.image_url}
              text={item.label}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
