import React, { useState, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Header from "../components/Header.jsx";
import axios from "axios";
import useUserContext from '../utils/context.js';

const Signup = () => {

  const { setIsLoggedIn, setUser } = useUserContext();
  
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [error, setError] = useState("");

  const userNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const navigate = useNavigate();

  function formSubmit(e) {
    e.preventDefault();

    if (!userName) {
      setError("Please enter User Name.");
      userNameInput.current.classList.remove("border-slate-600");
      userNameInput.current.classList.add("border-red-600");
      return;
    }

    if (userName.length < 3) {
      setError("Please enter Valid User Name.");
      userNameInput.current.classList.remove("border-slate-600");
      userNameInput.current.classList.add("border-red-600");
      return;
    }

    if (!email) {
      setError("Please enter email address.");
      emailInput.current.classList.remove("border-slate-600");
      emailInput.current.classList.add("border-red-600");
      return;
    }

    if (!password) {
      setError("Please enter password.");
      passwordInput.current.classList.remove("border-slate-600");
      passwordInput.current.classList.add("border-red-600");
      return;
    }

    if (password.length < 9) {
      setError("Your Password must have atleast 8 characters.");
      passwordInput.current.classList.remove("border-slate-600");
      passwordInput.current.classList.add("border-red-600");
      return;
    }

    if (!confirmPassword) {
      setError("Please enter confirm password.");
      confirmPasswordInput.current.classList.remove("border-slate-600");
      confirmPasswordInput.current.classList.add("border-red-600");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password does not match.");
      confirmPasswordInput.current.classList.remove("border-slate-600");
      confirmPasswordInput.current.classList.add("border-red-600");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test(email);

    if (!result) {
      setError("Please provide valid email address");
      emailInput.current.classList.remove("border-slate-600");
      emailInput.current.classList.add("border-red-600");
      return;
    }

    signUpRequest();
  };
  
  async function signUpRequest() {

    try{

      const response = await axios.post("http://localhost:8000/api/v1/user/register", {
        userName,
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      if(response.data.success){
        setIsLoggedIn(true);
        setUser(response.data.user)
        navigate("/");
      }

    }catch(error){
      setError(error.response.data.message);
    }
  };

  function handleFieldsChange() {
    setError("");

    userNameInput.current.classList.remove("border-red-600");
    userNameInput.current.classList.add("border-slate-600");

    emailInput.current.classList.remove("border-red-600");
    emailInput.current.classList.add("border-slate-600");

    passwordInput.current.classList.remove("border-red-600");
    passwordInput.current.classList.add("border-slate-600");

    confirmPasswordInput.current.classList.remove("border-red-600");
    confirmPasswordInput.current.classList.add("border-slate-600");

  }

  return (
    <>
      <Header />
      <main className="flex justify-center items-center pt-4 h-[85vh] bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <form
          onSubmit={formSubmit}
          className="flex flex-col border-2 border-slate-600 px-8 pb-8 pt-6 w-1/3 rounded"
        >
          <h3 className="font-medium text-4xl mb-10 select-none">SignUp</h3>

          <input
            ref={userNameInput}
            type="text"
            value={userName}
            onChange={ ({ target }) => { setUserName(target.value); handleFieldsChange(); }}
            placeholder="Full Name"
            className="my-2 py-2 px-4 rounded outline-none border-2 bg-transparent border-slate-600"
          />

          <input
            ref={emailInput}
            type="text"
            value={email}
            onChange={ ({ target }) => { setEmail(target.value); handleFieldsChange(); }}
            placeholder="Email"
            className="my-2 py-2 px-4 rounded outline-none border-2 bg-transparent border-slate-600"
          />

          <div ref={passwordInput} className="my-2 py-2 px-4 rounded border-2 flex items-center border-slate-600">
            <input
              type={passwordEye ? "text" : "password"}
              value={password}
              onChange={ ({ target }) => { setPassword(target.value); handleFieldsChange(); }}
              placeholder="Password"
              className="w-full rounded outline-none bg-transparent "
            />
            {passwordEye ? (
              <FaRegEyeSlash
                onClick={e => setPasswordEye(!passwordEye)}
                size={20}
                className="text-slate-400 cursor-pointer ml-2"
              />
            ) : (
              <FaRegEye
                onClick={e => setPasswordEye(!passwordEye)}
                size={20}
                className="text-blue-700 cursor-pointer ml-2 hover:text-blue-500"
              />
            )}
          </div>

          <div ref={confirmPasswordInput} className="my-2 py-2 px-4 rounded border-2 flex items-center border-slate-600">
            <input
              type={confirmPasswordEye ? "text" : "password"}
              value={confirmPassword}
              onChange={ ({ target }) => { setConfirmPassword(target.value); handleFieldsChange(); }}
              placeholder="Confirm Password"
              className="w-full rounded outline-none bg-transparent"
            />
            {confirmPasswordEye ? (
              <FaRegEyeSlash
                onClick={e => setConfirmPasswordEye(!confirmPasswordEye)}
                size={20}
                className="text-slate-400 cursor-pointer ml-2"
              />
            ) : (
              <FaRegEye
                onClick={e => setConfirmPasswordEye(!confirmPasswordEye)}
                size={20}
                className="text-blue-700 cursor-pointer ml-2 hover:text-blue-500"
              />
            )}
          </div>
          <p className="text-red-600 text-sm">{error}</p>
          <button
            type="submit"
            className="mt-8 mb-4 bg-blue-600 text-white py-2 font-medium rounded hover:bg-blue-700"
          >
            Register
          </button>
          <div className="flex text-sm justify-between">
            <p className="select-none">Already have an account? </p>{" "}
            <Link to="/login" className="text-blue-600">
              {" "}
              Login to account
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default Signup