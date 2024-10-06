import React, { useState, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { UserContextProvider } from "./utils/context.js";
import axios from "axios";
import { baseUrl } from "./utils/constants.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {

    const abc = async () => {
      try{

        const url = `${baseUrl}user/get`;

        const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      setIsLoggedIn(true);
      setUser(response.data.User);
      
    }catch(error){
      setIsLoggedIn(false);
      setUser({});
      console.log(error.response)
    }
  }
  abc();
  }, [ isLoggedIn ])

  return (
    <UserContextProvider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>

      <RouterProvider router={router} />

    </UserContextProvider>
  )
};

export default App;
