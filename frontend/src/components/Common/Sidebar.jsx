/** @format */

import React, { useContext, useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { AppContext } from "../../Context/AppContext";
import { IoMdMenu } from "react-icons/io";
import { axiosInstance } from "../../Context/AxiosConfig";

function Sidebar() {
  const { user, setUser, sidebar, setSidebar } = useContext(AppContext);
  const [links, setLinks] = useState();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const response = await axiosInstance.get("/user/logout");
      setUser(response.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNavs();
    // console.log(user);
  }, [user]);

  const getNavs = () => {
    if (!user.logged) {
      // console.log('first')
      setLinks(
        <>
          {" "}
          <NavLink to='/login' className='hover:text-violet-400'>
            Login
          </NavLink>
          <NavLink to='/signUp' className='hover:text-violet-400'>
            SignUp
          </NavLink>
        </>
      );
    } else if (user.role === "customer") {
      setLinks(
        <>
          <NavLink to='/' className='hover:text-violet-400'>
            DashBoard
          </NavLink>
          <NavLink to='/tickets' className='hover:text-violet-400'>
            Tickets
          </NavLink>
          <NavLink to='/profile' className='hover:text-violet-400'>
            Profile
          </NavLink>
        </>
      );
    } else if (user.role == "admin") {
      setLinks(
        <>
          <NavLink to='/' className='hover:text-violet-400'>
            DashBoard
          </NavLink>
          <NavLink to='/tickets' className='hover:text-violet-400'>
            Tickets
          </NavLink>
          <NavLink to='/customers' className='hover:text-violet-400'>
            Customers{" "}
          </NavLink>
          <NavLink to='/profile' className='hover:text-violet-400'>
            Profile
          </NavLink>
        </>
      );
    } else {
      setLinks(
        <>
          <NavLink to='/' className='hover:text-violet-400'>
            DashBoard
          </NavLink>
          <NavLink to='/tickets' className='hover:text-violet-400'>
            Tickets
          </NavLink>{" "}
          <NavLink to='/customers' className='hover:text-violet-400'>
            Users{" "}
          </NavLink>
          <NavLink to='/profile' className='hover:text-violet-400'>
            Profile
          </NavLink>
        </>
      );
    }
    // console.log(user);
  };

  return (
    <aside
      className={`h-dvh w-64 p-10 bg-white fixed top-16 left-0 border border-slate-400 ${
        sidebar ? "" : "hidden"
      } dark:bg-sky-900 dark:text-gray-200 z-30`}
    >
      <button
        title='Close Sidebar'
        className={`absolute top-1 right-1 hover:text-rose-500 hover:bg-gray-700 ${
          sidebar ? "text-2xl" : "hidden"
        }`}
        onClick={() => setSidebar((prev) => !prev)}
      >
        <IoMdMenu />
      </button>

      <div className='flex flex-col items-center justify-evenly gap-3 my-4 min-h-44 md:min-h-96 text-xl font-medium text-blue-800 dark:text-blue-100'>
        {links}
      </div>
      <hr className=' w-full pb-10' />
      <button
        onClick={() => logOut()}
        className='flex items-center gap-3 justify-center bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 text-xl rounded-lg'
      >
        Log Out <CiLogout />
      </button>
    </aside>
  );
}

export default Sidebar;
