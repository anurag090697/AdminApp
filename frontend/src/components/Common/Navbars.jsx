/** @format */

import React, { useContext, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";

import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { AppContext } from "../../Context/AppContext";

function Navbar() {
  const [dark, setDark] = useState(false);
  const { sidebar, setSidebar, user } = useContext(AppContext);
  // console.log(user);
  function setMode() {
    setDark((prevDark) => {
      const newDark = !prevDark;
      if (newDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newDark;
    });
    // console.log(dark);
  }

  return (
    <header className='flex w-full dark:text-gray-100 max-w-full'>
      <nav
        className={`flex items-center ${
          sidebar ? "justify-end" : "justify-between"
        } h-16 bg-white dark:bg-sky-900 w-full px-3 md:px-10 border-b-2 border-slate-400`}
      >
        <button
          className={`${
            sidebar ? "hidden" : "text-3xl"
          } hover:text-sky-500 hover:bg-gray-700`}
          onClick={() => setSidebar((prev) => !prev)}
        >
          <IoMdMenu />
        </button>{" "}
        <div className='flex items-center justify-center gap-6'>
          {user.logged ? (
            <div className='flex items-center justify-center gap-2 text-xl'>
              {" "}
              <p className='rounded-full bg-violet-600 border text-white w-6 h-6 flex items-center justify-center text-sm'>
                {user.name.charAt(0)}
              </p>
              <h3>{user.name}</h3>
            </div>
          ) : (
            ""
          )}
          <button
            onClick={setMode}
            className={`flex gap-4 text-xl py-2 px-3 rounded-3xl border select-none relative dark:text-amber-300 dark:bg-sky-900 bg-amber-200`}
          >
            <span
              className={`rounded-full border w-8 h-8 absolute top-0.5 left-2 ${
                dark ? "translate-x-8 bg-rose-800" : "bg-sky-400"
              } ease-out duration-500 transition-all`}
            ></span>
            <MdLightMode />
            <MdDarkMode />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
