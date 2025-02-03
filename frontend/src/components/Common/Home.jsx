/** @format */

import React, { useContext, useEffect } from "react";
import herobg from "../../assets/heroBg.jpg";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
function Home() {
  const { user, dataNums, setDataNums } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.logged) {
      navigate("/login");
    }
  }, []);

  return (
    <div
      className='bg-violet-100 w-full pt-16 dark:bg-violet-950 text-white bg-cover md:bg-right min-h-dvh'
      style={{ backgroundImage: `url(${herobg})` }}
    >
      {/* <img src={herobg} alt="" /> */}
      <div
        className='flex flex-col gap-4 px-4 items-start justify-center w-full bg-cover bg-right select-none '
        // style={{ backgroundImage: `url(${herobg})` }}
      >
        <h2 className='w-fit text-rose-500 mx-auto text-3xl py-6 '>
          DashBoard
        </h2>
        <div className='px-6 flex flex-col items-center gap-10 sm:gap-20 lg:gap-32 w-full md:items-start justify-between text-center'>
          <h1 className='text-2xl md:text-4xl text-cyan-100'>
            Welcome to AdminApp
          </h1>
          <div className=' flex flex-col items-center justify-center gap-4 p-3 w-fit md:h-60 bg-white/50 rounded-lg text-sm md:text-xl'>
            <h2 className='text-2xl text-amber-400 '>Numbers Till Date</h2>
            <p>Total number of customers - {dataNums.users} </p>
            <p>Total number of tickets - {dataNums.tickets}</p>
            <p>Number of tickets resolved - {dataNums.resolved}</p>
            {/* <p>Number of tickets resolved - {33}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
