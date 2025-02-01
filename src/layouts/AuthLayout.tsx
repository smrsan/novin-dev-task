import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import getToken from "../helpers/getToken";

const AuthLayout = () => {
  const nav = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    nav("/dashboard");
  }, [nav]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
