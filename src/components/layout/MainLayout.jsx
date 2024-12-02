import { styled } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../Drawer/Footer";
import Header from "../Drawer/Header";

const MainLayout = () => {
  const { pathname } = useLocation();
  // const token = localStorage.getItem("token");
  const token = true;

  if (token && pathname === "/") {
    return <Navigate to={"/admin"} />;
  }

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
