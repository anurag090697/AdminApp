/** @format */

import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { axiosInstance } from "../../Context/AxiosConfig";
import { FaEye } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [showP, setshowP] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setRsponseMsg] = useState({ message: "", error: "" });
  const { user, setUser } = useContext(AppContext);
  // console.log(user)
  async function logThatUser(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      // console.log(response.data);
      setUser({ ...response.data, logged: true });
      setPassword("");
      setEmail("");
    } catch (error) {
      setRsponseMsg({ ...error.response.data });
      // console.log(error);
    }
  }

  useEffect(() => {
    if (user.logged) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setRsponseMsg({ message: "", error: "" });
    }, 6000);
  }, [responseMsg]);

  return (
    <div className=' w-full h-dvh pt-16 flex items-center justify-center absolute z-40 top-0 right-0 bg-gray-700'>
      <div className='border w-fit px-6 py-4 rounded-xl shadow-md shadow-cyan-900  bg-gradient-to-tl from-gray-300 to-cyan-100/10'>
        <h1 className='text-2xl font-medium text-violet-50 mb-3 mx-auto w-fit'>
          LogIn
        </h1>
        <form
          action=''
          className='flex flex-col gap-4 py-4 px-2 items-center justify-center text-blue-700'
          onSubmit={(e) => logThatUser(e)}
        >
          <input
            name='email'
            type='email'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            required
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* <input
            type='password'
            name='password'
            className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
            required
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <div className='relative'>
            <input
              type={showP ? "text" : "password"}
              name='password'
              placeholder='Enter Password'
              className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
              value={password}
              onChange={(e) => setPassword((prev) => e.target.value)}
            />
            <span
              className={`${
                password ? "" : "hidden"
              } absolute right-2 top-1/3 ${
                showP ? "text-rose-600" : "text-lime-900"
              }`}
              onClick={() => setshowP(!showP)}
            >
              <FaEye />
            </span>
          </div>
          <button className='bg-orange-400 font-medium border text-xl p-2 rounded-xl text-white shadow-md shadow-orange-900 active:shadow-none hover:border-orange-600 hover:bg-orange-200 hover:text-gray-600 active:translate-y-1 transition-all'>
            Submit
          </button>
        </form>
        <div className='font-medium min-h-10 text-center'>
          <p className='text-green-700'>{responseMsg.message}</p>
          <p className='text-rose-700'>{responseMsg.error}</p>
        </div>
        <button
          // onClick={() => navigate("/user/forgotpassword")}
          className='text-center w-full pt-3 font-medium text-blue-600 hover:text-blue-500'
        >
          Forgot Password ?
        </button>

        <h1 className='flex items-center font-medium text-2xl text-gray-600'>
          <hr className='w-1/2 border' />
          or <hr className='w-1/2  border' />
        </h1>
        <div className='w-fit mx-auto text-center font-medium text-gray-600'>
          <p>Dont't have a account</p>
          <button
            className='text-green-700 hover:text-lime-500'
            onClick={() => navigate("/signUp")}
          >
            SignUp here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
