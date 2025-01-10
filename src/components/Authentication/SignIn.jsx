import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import logo from "../../../public/galaxeye-white.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "unofeeds@galaxeye.blue" && password === "unofeeds@blue#1") {
      login();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex md:justify-end justify-center  items-center h-screen bg-cover bg-center relative p-20 sm:p-20 bg-[url('../../../public/image%2080.png')]">
      <div className="absolute inset-6  bg-[#053c3ab3] -m-1 md:m-1.5 bg-opacity-70 text-white flex items-end p-10 rounded-2xl box-border z-10">
        <p className="max-w-1/2 sm:max-w-full mb-10 md:mb-20 text-sm sm:text-base">
          Your unbiased source of intelligence for Aquaculture, leveraging
          Satellite Imagery and AI
        </p>
      </div>
      <div className="bg-gradient-to-r from-[#121212] to-[#053C3A] rounded-xl shadow-2xl p-5 w-full md:max-w-[350px]  relative z-20">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <img src={logo} alt="GalaxEye Logo" className="w-[150px] mb-6 " />
          <h2 className="text-2xl font-normal mb-6 text-[#f6f1f1]">
            Login to your account
          </h2>
          <div className="mb-5 w-full">
            <label className="sr-only">Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-sm w-full p-4 border border-white border-opacity-80 rounded-xl text-white bg-transparent outline-none "
            />
          </div>
          <div className="mb-5 w-full">
            <label className="sr-only">Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-sm w-full p-4 border border-white border-opacity-80 rounded-xl text-white bg-transparent outline-none "
            />
          </div>
          {error && <p className="text-red-500 text-center mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full p-2.5 bg-[#00b894] text-black  rounded-xl hover:bg-[#009874] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
