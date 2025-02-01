import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import getToken from "../helpers/getToken";

const DashboardLayout = () => {
  const nav = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) return;
    nav("/");
  }, [nav]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
