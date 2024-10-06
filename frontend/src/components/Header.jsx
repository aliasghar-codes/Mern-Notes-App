import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Profile from "./Profile.jsx";
import Search from './Search.jsx';
import useUserContext from '../utils/context.js';
import axios from 'axios';
import { baseUrl } from '../utils/constants.js';

const Header = ({ inputValue, setInputValue, handleSearch }) => {

  const { isLoggedIn, setIsLoggedIn, setUser } = useUserContext();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const handleClear = () => {
    setInputValue("");
  }
  
  const handleLogout = async () => {

    try {

      axios.get(`${baseUrl}user/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      setIsLoggedIn(false);
      setUser({});
      
    } catch (error) {
      console.log(error);
    }

    navigate("/login");
  }

  return (
    <header className='px-12 drop-shadow border-b-2 border-slate-600 h-[15vh] flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-700'>
      <Link to={"/"}>
        <h3 className='text-2xl font-bold tracking-tighter drop-shadow-2xl text-white'>
        Nice<span className='text-blue-400'>Notes </span>
        </h3>
      </Link>
      {
      pathname === "/" && isLoggedIn && <Search value={ inputValue } setValue={ setInputValue } handleClear={ handleClear } handleSearch={ handleSearch } />
      }
      {
        pathname === "/" && (
          isLoggedIn ? ( <Profile handleLogout={ handleLogout } /> ) 
          : 
          (<Link to="/login" className='py-3 px-10 hover:bg-blue-600 font-medium bg-blue-500 text-white rounded'>LogIn</Link>)
        )
      }
    </header>
  )
}

export default Header