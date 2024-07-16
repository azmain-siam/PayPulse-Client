import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/axiosSecure";
import { useState } from "react";

const Login = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    const form = e.target;
    const identifier = form.identifier.value;
    const pin = form.pin.value;
    const userData = { identifier, pin };
    console.log(userData);

    try {
      const res = await axiosSecure.post("/login", userData);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", identifier);
      toast.success("Successfully Logged in!");
      navigate(location?.state || "/", { replace: true });
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        setError("Invalid Credential. Please check and try again!");
      }
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            PayPulse
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleLogin}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    name="identifier"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email or phone"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="pin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your PIN
                  </label>
                  <input
                    type="password"
                    name="pin"
                    id="password"
                    placeholder="Enter the 5 digit PIN"
                    maxLength={5}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
