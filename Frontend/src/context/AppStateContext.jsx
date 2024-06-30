import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Membuat konteks
const AppStateContext = createContext();

// Custom hook untuk menggunakan konteks
export const useAppState = () => useContext(AppStateContext); //eslint-disable-line

// Provider untuk menyediakan state ke dalam aplikasi
export const AppStateProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: true,
  });

  const [isLogin, setIsLogin_] = useState(false);
  const [user, setUser] = useState({ nama: "", tipeAkses: "" });

  class HandleModal {
    static open(id) {
      document.getElementById(id).showModal();
    }
    static close(id) {
      document.getElementById(id).close();
    }
  }
  const setIsLogin = (value) => {
    setIsLogin_(value);
  };
  class HandleToast {
    static success(message) {
      setToast({
        show: true,
        message,
        success: true,
      });
      setTimeout(() => {
        setToast({
          show: false,
          message: "",
          success: true,
        });
      }, 3000);
    }

    static error(message) {
      setToast({
        show: true,
        message,
        success: false,
      });
      setTimeout(() => {
        setToast({
          show: false,
          message: "",
          success: false,
        });
      }, 3000);
    }
  }
  return (
    <AppStateContext.Provider
      value={{
        HandleModal,
        toast,
        HandleToast,
        isLogin,
        setIsLogin,
        user,
        setUser,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = {
  children: PropTypes.node,
};
