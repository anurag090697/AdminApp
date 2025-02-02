/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { axiosInstance } from "../../Context/AxiosConfig";

function SignUp() {
  const [showP, setshowP] = useState(false);
  const [responseMsg, setRsponseMsg] = useState({ message: "", error: "" });
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    role: "",
    mobile: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(userData);
    try {
      const response = await axiosInstance.post("/user/register", userData);
      console.log(response.data);
      setRsponseMsg({ ...response.data });
      setUserData({ name: "", password: "", email: "", role: "", mobile: "" });
    } catch (error) {
      setRsponseMsg({ ...error.response.data });
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setRsponseMsg({ message: "", error: "" });
    }, 6000);
  }, [responseMsg]);

  return (
    <div className=' w-full h-dvh flex items-center justify-center absolute z-40 top-0 right-0 bg-gray-700'>
      <div className='border w-fit px-6 py-4 rounded-xl shadow-md shadow-cyan-900  bg-gradient-to-tl from-gray-300 to-cyan-100/10'>
        <h1 className='text-2xl font-medium text-violet-50 mb-3 mx-auto w-fit'>
          SignUp
        </h1>
        <form
          action=''
          className='flex flex-col gap-4 py-4 px-2 items-center justify-center text-blue-700'
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type='text'
            name='name'
            required
            placeholder='Enter Name'
            className='rounded-lg outline-fuchsia-900 text-center p-1 font-medium'
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />{" "}
          <input
            type='email'
            name='email'
            required
            placeholder='Enter Email'
            className='rounded-lg outline-fuchsia-900 text-center p-1 font-medium'
            value={userData.email}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            type='number'
            name='mobile'
            required
            placeholder='Enter Mobile No.'
            className='rounded-lg outline-fuchsia-900 text-center p-1 font-medium'
            value={userData.mobile}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, mobile: e.target.value }))
            }
          />
          <select
            name=''
            required
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, role: e.target.value }))
            }
            className='rounded-lg w-full outline-fuchsia-900 text-center p-1 font-medium'
          >
            <option>Select Role...</option>
            <option value='customer'>Customer</option>
            <option value='agent'>Agent</option>
            <option value='admin'>Admin</option>
          </select>
          <div className='relative'>
            <input
              type={showP ? "text" : "password"}
              name='password'
              placeholder='Enter Password'
              className='rounded-lg outline-fuchsia-900 text-center p-1 font-medium'
              value={userData.password}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <span
              className={`${
                userData.password ? "" : "hidden"
              } absolute right-2 top-2 ${
                showP ? "text-rose-600" : "text-lime-900"
              }`}
              onClick={() => setshowP(!showP)}
            >
              <FaEye />
            </span>
          </div>
          <button className='bg-orange-400 font-medium border text-xl py-2 px-4 rounded-xl text-white shadow-md shadow-orange-900 active:shadow-none hover:border-orange-600 hover:bg-orange-200 hover:text-gray-600 active:translate-y-1 transition-all'>
            Submit
          </button>
        </form>
        <div className='font-medium min-h-10 text-center'>
          <p className='text-green-700'>{responseMsg.message}</p>
          <p className='text-rose-500'>{responseMsg.error}</p>
        </div>

        <h1 className='flex items-center font-medium text-2xl text-gray-600'>
          <hr className='w-1/2 border' />
          or <hr className='w-1/2  border' />
        </h1>
        <div className='w-fit mx-auto text-center font-medium text-gray-600'>
          <p>Dont't have a account</p>
          <button
            className='text-green-700 hover:text-lime-500'
            onClick={() => navigate("/login")}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
