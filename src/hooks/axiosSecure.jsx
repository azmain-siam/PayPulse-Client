import axios from "axios";
import { useNavigate } from "react-router-dom";
import useContextProvider from "./useContextProvider";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { Logout } = useContextProvider();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      // console.log("request stopped by:", token);
      config.headers.authorization = `${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await Logout();
        navigate("/login");
      }
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
