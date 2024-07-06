import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import Toast from "../../Toast";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../../context/AppStateContext";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setUser, isLogin, setIsLogin } = useAppState();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const isTokenExpired = decoded.exp < Date.now() / 1000;
      if (isTokenExpired) {
        localStorage.removeItem("token");
        localStorage.removeItem("tipeAkses");
        return navigate("/admin/login");
      } else {
        localStorage.setItem("tipeAkses", decoded.tipeAkses);
        setUser(decoded);
        return setIsLogin(true);
      }
    } else {
      navigate("/admin/login");
    }
    // eslint-disable-next-line
  }, [token]);

  if (isLogin)
    return (
      <div className="h-screen flex flex-col">
        <AdminNavbar />
        <main className="flex-grow">
          <AdminSidebar>{children}</AdminSidebar>
        </main>
        <Toast />
      </div>
    );
}
AdminLayout.propTypes = {
  children: PropTypes.node,
};
