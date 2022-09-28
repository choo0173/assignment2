import { Navigate, Outlet } from "react-router-dom";

const LoginRoute = () => {
  return sessionStorage.getItem("username") ? <Outlet /> : <Navigate to="/" />;
};

export default LoginRoute;
