import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  // const user = localStorage.getItem("user");
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setLoading(false);
  }, []);

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
