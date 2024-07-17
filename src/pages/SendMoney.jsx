import { useState } from "react";
import useAxiosSecure from "../hooks/axiosSecure";
import useContextProvider from "../hooks/useContextProvider";
import toast from "react-hot-toast";

const SendMoney = () => {
  const { user: userEmail } = useContextProvider();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [fee, setFee] = useState(0);
  const [total, setTotal] = useState(0);

  const handleTotalFee = (e) => {
    const value = parseInt(e.target.value);
    if (value > 99) {
      setFee(5);
    } else {
      setFee(0);
    }
    setTotal(value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const form = e.target;
    const recipient_number = form.recipient_number.value;
    const send_amount = parseInt(form.send_amount.value);
    const pin = form.pin.value;
    const sendingData = { recipient_number, send_amount, pin, userEmail };

    try {
      const res = await axiosSecure.patch("/send", sendingData);
      console.log(res);
      toast.success("Sent Money Successfully!");
      form.reset();
      setError("");
    } catch (error) {
      setError(error.response.data);
    }
    console.log(sendingData);
  };

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Send Money
              </h1>

              <form onSubmit={handleSend} className="" action="#">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Recipient Phone Number
                    </label>
                    <input
                      type="text"
                      name="recipient_number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Phone"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="amount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Amount
                    </label>
                    <input
                      onChange={handleTotalFee}
                      type="number"
                      name="send_amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter amount"
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
                    {error && (
                      <p className="text-red-600 text-sm mt-2">{error}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2 my-5 text-sm font-medium">
                  <h1 className="">Fee: {fee}</h1>
                  <h1 className="">Total Amount: {total + fee}</h1>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Send
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
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

export default SendMoney;
