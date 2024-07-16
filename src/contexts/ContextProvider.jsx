import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../hooks/axiosSecure";
export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  // const user = localStorage.getItem("user");
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (user) {
      axiosSecure.post("/jwt", user).then((res) => {
        if (res.data.token) {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
        }
      });
    } else {
      localStorage.removeItem("token");
    }
  }, [user, axiosSecure]);

  const contextInfo = {
    user,
    loading,
    setLoading,
  };

  return <Context.Provider value={contextInfo}>{children}</Context.Provider>;
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.element,
};
