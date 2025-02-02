/** @format */

import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { axiosInstance } from "../../Context/AxiosConfig";

function UserCard({ data, getUserList }) {
  const { user } = useContext(AppContext);
  const [cardData, setCardData] = useState(null);
  //   console.log(data);
  const updateProfile = async () => {
    try {
      const formData = {
        name: cardData.name,
        email: cardData.email,
        role: cardData.role,
        mobile: cardData.mobile,
      };
      const response = await axiosInstance.patch("/user/editProfile", {
        formData,
        userId: cardData._id,
      });
      // console.log(response);
      getUserList();
      setCardData(null);
    } catch (error) {
      console.log(error);
    }
  };

  return cardData ? (
    <div className='flex gap-3 flex-col md:flex-row flex-wrap items-center justify-center w-full p-2 dark:text-slate-900'>
      <input
        type='text'
        value={cardData.name}
        onChange={(e) =>
          setCardData((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder='Enter Name'
        className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
      />
      <input
        type='text'
        value={cardData.email}
        onChange={(e) =>
          setCardData((prev) => ({ ...prev, email: e.target.value }))
        }
        placeholder='Enter Email'
        className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
      />
      <input
        type='text'
        value={cardData.role}
        onChange={(e) =>
          setCardData((prev) => ({ ...prev, role: e.target.value }))
        }
        placeholder='Enter Role'
        className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
      />
      <input
        type='number'
        onChange={(e) =>
          setCardData((prev) => ({ ...prev, mobile: e.target.value }))
        }
        value={cardData.mobile}
        placeholder='Enter Mobile'
        className='py-2 px-3 text-center rounded-lg border-2 border-gray-400 shadow-md shadow-cyan-900 outline-lime-600 font-medium'
      />
      <button
        disabled={user.role !== "admin"}
        onClick={() => updateProfile()}
        className='px-4 py-2 text-center rounded-lg text-slate-700 bg-cyan-400 border-2 border-gray-400 shadow-md shadow-cyan-900'
      >
        Save
      </button>
    </div>
  ) : (
    <div className='flex flex-wrap flex-col md:flex-row items-center justify-start w-full p-2 text-xl dark:text-violet-100 border border-slate-600'>
      <h3 className='w-full md:w-1/6'>{data.name}</h3>
      <h3 className='w-full md:w-2/6'>{data.email}</h3>
      <h3 className='w-full md:w-1/6'>{data.role}</h3>
      <h3 className='w-full md:w-1/6'>{data.mobile}</h3>
      <button
        disabled={user.role !== "admin"}
        className={`hover:underline w-full md:w-1/6`}
        onClick={() => setCardData(data)}
      >
        {user.role != "admin" ? "None" : "Edit"}
      </button>
    </div>
  );
}

export default UserCard;
