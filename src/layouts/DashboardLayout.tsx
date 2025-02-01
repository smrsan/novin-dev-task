import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import getToken from "../helpers/getToken";
import logout from "../helpers/logout";

const DashboardLayout = () => {
  const nav = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    nav("/");
  }, [nav]);

  useEffect(() => {
    const token = getToken();
    if (token) return;
    nav("/");
  }, [nav]);

  return (
    <>
      <AppBar position="static" color="default" sx={{ mb: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <div>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
