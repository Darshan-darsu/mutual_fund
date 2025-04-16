import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_BASE_URL + "auth/register", loginData)
      .then((res) => {
        alert("success login now");
        navigate("/");
      })
      .catch((err) => {
        alert("error regiter failed");
        console.log(err, "login error");
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Register
        </h2>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="email"
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-200"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
        <Link
          to="/"
          className="py-2 float-end underline text-blue-400 text-1xl"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
