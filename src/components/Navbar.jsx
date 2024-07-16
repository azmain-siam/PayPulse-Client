import { HiOutlineMenu } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <HiOutlineMenu />
        <h3 className="">PayPulse</h3>
      </div>

      {/* Login and Register button */}
      <div>
        <button>Login/Register</button>
      </div>
    </div>
  );
};

export default Navbar;
