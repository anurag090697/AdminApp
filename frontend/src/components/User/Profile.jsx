/** @format */

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { FaEye } from "react-icons/fa";
import { axiosInstance } from "../../Context/AxiosConfig";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    if (user.logged) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
      }));
    } else {
      navigate("/login");
    }
  }, [user]);

  const editProfileData = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const response = await axiosInstance.patch("/user/editProfile", {
        formData,
        userId: user._id,
      });
      // console.log(response);
      setUser({ ...response.data, logged: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-violet-100 pt-16 w-full dark:bg-violet-950 text-sky-400 select-none flex justify-center items-center flex-col'>
      <h1 className='text-center py-4 text-3xl'>Profile</h1>
      {editing ? (
        <>
          <form
            action=''
            onSubmit={(e) => editProfileData(e)}
            className='w-fit p-6 grid grid-cols-4 items-center gap-5 justify-center text-2xl text-slate-700 dark:text-lime-400'
          >
            {" "}
            <label htmlFor='name' className='col-span-1'>
              Name :{" "}
            </label>
            <input
              name='name'
              type='text'
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className='col-span-3 py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
            />{" "}
            <label htmlFor='email' className='col-span-1'>
              Email :{" "}
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className='col-span-3 py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
            />
            <label htmlFor='role' className='col-span-1'>
              Role :{" "}
            </label>
            <input
              name='role'
              type='text'
              value={formData.role}
              disabled
              className='col-span-3 py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
            />{" "}
            <label htmlFor='mobile' className='col-span-1'>
              Mobile :{" "}
            </label>
            <input
              type='number'
              name='mobile'
              value={formData.mobile}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, mobile: e.target.value }))
              }
              className='col-span-3 py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
            />
            <label htmlFor='password' className='col-span-1'>
              Password :{" "}
            </label>
            <div className='col-span-3 relative'>
              {" "}
              <input
                type={showPass ? "text" : "password"}
                placeholder='Enter  a new passwrod'
                name='password'
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className='w-full py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
              />
              <span
                onClick={() => setShowPass((prev) => !prev)}
                className={`${
                  showPass ? "" : "hidden"
                }hover:text-rose-400 absolute right-2 top-1/4`}
              >
                <FaEye />
              </span>
            </div>
            <button className='col-span-4 bg-lime-600 text-3xl py-2 rounded-md text-amber-300 hover:bg-lime-500'>
              {" "}
              Submit
            </button>{" "}
            <p
              onClick={() => setEditing(false)}
              className='col-span-4 bg-rose-600 text-3xl py-2 rounded-md text-amber-950 hover:bg-rose-500 text-center'
            >
              Cancel
            </p>
          </form>
        </>
      ) : (
        <div className='w-fit p-10 flex flex-col items-start gap-8 justify-center text-2xl text-slate-700 dark:text-lime-300'>
          <h3 className='w-full border border-slate-800 p-2 rounded-md shadow-md shadow-slate-600 dark:shadow-violet-700 dark:border-violet-600'>
            Name : <span className='text-amber-600'>{user.name}</span>
          </h3>{" "}
          <h3 className='w-full border border-slate-800 p-2 rounded-md shadow-md shadow-slate-600 dark:shadow-violet-700 dark:border-violet-600'>
            Email : <span className='text-amber-600 '>{user.email}</span>
          </h3>{" "}
          <h3 className='w-full border border-slate-800 p-2 rounded-md shadow-md shadow-slate-600 dark:shadow-violet-700 dark:border-violet-600'>
            Role : <span className='text-amber-600 '>{user.role}</span>
          </h3>{" "}
          <h3 className='w-full border border-slate-800 p-2 rounded-md shadow-md shadow-slate-600 dark:shadow-violet-700 dark:border-violet-600'>
            Mobile : <span className='text-amber-600 '>{user.mobile}</span>
          </h3>{" "}
          <button
            onClick={() => setEditing((prev) => true)}
            className='w-full bg-emerald-700 text-amber-500 hover:bg-emerald-600 focus:shadow-none focus:translate-y-2 border border-slate-800 p-2 rounded-md shadow-md shadow-slate-600 '
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
