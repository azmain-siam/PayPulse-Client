import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useAxiosCommon from "../hooks/axiosCommon";
export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  // const user = localStorage.getItem("user");
  const axiosCommon = useAxiosCommon();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (user) {
      axiosCommon.post("/jwt", user).then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
      });
    } else {
      localStorage.removeItem("token");
    }
  }, [user, axiosCommon]);

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  const contextInfo = {
    user,
    loading,
    setLoading,
    Logout,
  };

  return <Context.Provider value={contextInfo}>{children}</Context.Provider>;
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.element,
};
