import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Header from "../components/Header.jsx";
import axios from "axios";
import useUserContext from "../utils/context.js";

const Login = () => {

  const { setIsLoggedIn, setUser } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordEye, setPasswordEye] = useState(false);

  const navigate = useNavigate();
  
  function formSubmit(e) {
    e.preventDefault();
    
    setError("");

    if(!email){
      setError("Please enter the email address")
      return;
    }

    if(!password){
      setError("Please enter the password")
      return;
    }
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test(email)

    if(!result){
      setError("Please provide valid email address");
      return;
    }
    
    loginRequest();
  }

  async function loginRequest(){

    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/login", {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
  
      if(response.data.success){
        setIsLoggedIn(true);
        setUser(response.data.user);
        navigate("/");
      }else{
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message)
    }

  }
  return (
    <>
      <Header />
      <main className="flex justify-center items-center h-[85vh] pt-4 text-white bg-gradient-to-r from-slate-900 to-slate-700">
        <form
          onSubmit={formSubmit}
          className="flex flex-col border-2 px-8 pb-16 pt-12 w-1/3 rounded border-slate-600"
        >
          <h3 className="font-medium text-4xl mb-10 select-none">Login</h3>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="my-2 py-2 px-4 rounded outline-none border-2 border-slate-600 bg-transparent"
          />

          <div className="my-2 py-2 px-4 rounded border-2 flex items-center border-slate-600">
            <input
              type={passwordEye ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded outline-none bg-transparent"
            />
            {passwordEye ? (
              <FaRegEyeSlash
                onClick={(e) => setPasswordEye(!passwordEye)}
                size={22}
                className="text-slate-400 cursor-pointer ml-2"
              />
            ) : (
              <FaRegEye
                onClick={(e) => setPasswordEye(!passwordEye)}
                size={22}
                className="text-blue-700 cursor-pointer ml-2 hover:text-blue-500"
              />
            )}
          </div>
          <p className="text-red-600 text-sm">{error}</p>
          <button
            type="submit"
            className="mt-8 mb-4 bg-blue-600 text-white py-2 font-medium rounded hover:bg-blue-700"
          >
            Login
          </button>
          <div className="flex text-sm justify-between">
            <p className="select-none">Not registered yet? </p>{" "}
            <Link to="/sign-up" className="text-blue-600">
              {" "}
              Create an Account
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;
