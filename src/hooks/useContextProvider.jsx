import { useContext } from "react";
import { Context } from "../contexts/ContextProvider";

const useContextProvider = () => {
  const contextInfo = useContext(Context);
  return contextInfo;
};

export default useContextProvider;
