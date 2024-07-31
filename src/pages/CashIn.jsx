import { useState } from "react";
import useAxiosSecure from "../hooks/axiosSecure";
import useContextProvider from "../hooks/useContextProvider";
import toast from "react-hot-toast";

const CashIn = () => {
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const { user } = useContextProvider();
  console.log(user);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const agent_number = form.agent_number.value;
    const send_amount = parseInt(form.send_amount.value);
    const pin = form.pin.value;
    const sendingData = { agent_number, send_amount, pin, user };

    try {
      const res = await axiosSecure.post("/requests", sendingData);
      console.log(res);
      // if (res.status === 200) {
      //   setError(res.data);
      // }
      if (res?.data.insertedId) {
        form.reset();
        setError("");
        toast.success("Request sent to the agent!");
      }
    } catch (error) {
      // setError(error.response.data);
      console.log(error);
    }
  };
  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="space-y-2">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Cash In
                </h1>
                <p className=" text-gray-600">
                  Send a Cash In request to an agent
                </p>
              </div>

              <form onSubmit={handleSendRequest} className="" action="#">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Agent Phone Number
                    </label>
                    <input
                      type="text"
                      name="agent_number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Phone"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="amount"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Amount
                    </label>
                    <input
                      // onChange={handleTotalFee}
                      type="number"
                      name="send_amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Enter amount"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pin"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your PIN
                    </label>
                    <input
                      type="password"
                      name="pin"
                      id="password"
                      placeholder="Enter the 5 digit PIN"
                      maxLength={5}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      required=""
                    />
                    {/* {error && (
                      <p className="text-red-600 text-sm mt-2">{error}</p>
                    )} */}
                  </div>
                </div>
                {/* <div className="space-y-2 my-5 text-sm font-medium">
                  <h1 className="">Fee: {fee}</h1>
                  <h1 className="">Total Amount: {total + fee}</h1>
                </div> */}
                <button
                  type="submit"
                  className="w-full text-white mt-6 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Cash Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CashIn;
