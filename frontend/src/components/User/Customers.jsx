/** @format */

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { axiosInstance } from "../../Context/AxiosConfig";
import UserCard from "./userCard";
import { useNavigate } from "react-router-dom";

function Customers() {
  const { user } = useContext(AppContext);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const getUserList = async () => {
    try {
      const response = await axiosInstance.get("/user/fetchAllUsers");
      // console.log(response);
      setUserList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user.logged) {
      getUserList();
    } else {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className='bg-violet-100 w-full dark:bg-violet-950 text-sky-900 dark:text-sky-100 pt-16'>
      <h1 className='py-6 text-3xl text-center'>Users</h1>
      <div className='flex  items-center gap-3 justify-center flex-col mx-auto p-2 md:p-10'>
        <div className='lg:flex flex-wrap items-center justify-start w-full hidden p-2 text-2xl text-cyan-900 dark:text-violet-200 border bg-violet-300 dark:bg-transparent dark:underline border-slate-600'>
          <h3 className='w-1/6'>Name</h3>
          <h3 className='w-2/6'>Email</h3>
          <h3 className='w-1/6'>Role</h3>
          <h3 className='w-1/6'>Mobile</h3>
          <button className='w-1/6'>Action</button>
        </div>
        {userList.length ? (
          userList.map((ele, idx) => {
            return (
              <UserCard
                data={ele}
                getUserList={getUserList}
                key={idx}
              ></UserCard>
            );
          })
        ) : (
          <h1 className=' py-20 text-4xl text-rose-500 text-center'>
            No users to show
          </h1>
        )}
      </div>
    </div>
  );
}

export default Customers;
