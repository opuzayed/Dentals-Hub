import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoden from '../../../assets/images/logoden.png';
import ToogleSwitcher from "../../../Components/ToogleSwitcher/ToogleSwitcher";
import { AuthContext } from "../../../contexts/AuthProvider";
const Navbar = () => {
  const {user} = useContext(AuthContext);
    const menuItems = 
       <>
        <li><Link to='/'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg><span className="font-medium">Home</span></Link></li>
        <li><Link to='/appointment'>Appointment</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/reviews'>Reviews</Link></li>
        {
            user?.uid ?
            <li><Link to='/'>Sign Out</Link></li>
            :
          <>
            <li><Link to='/login'>Sign In</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
          </>
        }
        <li><div>
        <ToogleSwitcher></ToogleSwitcher>
        </div></li>
       </>
  return (
      <div className="navbar bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium rounded-lg flex justify-between">
        <div className="navbar-start">
          <Link to='/' className="btn btn-ghost normal-case text-xl"><img className="w-14 px-2 rounded-xxl" src={logoden} alt='Teeth logo'></img> <span className="text-xl font-bold text-lime-400 italic">Dental <span className="text-black">Point</span></span></Link>
        </div>
        <div className="navbar-end">
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-teal-700 rounded-box w-52"
            >
                {menuItems}
            </ul>
          </div>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {
                menuItems
            }
            
          </ul>
        </div>
      </div>
  );
};

export default Navbar;
