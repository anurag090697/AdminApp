/** @format */

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { axiosInstance } from "../../Context/AxiosConfig";
import { RiCloseLine } from "react-icons/ri";

function Ticket() {
  const [allTickets, setAllTickets] = useState([]);
  const [addTicket, setAddTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [newTicketData, setNewTicketData] = useState({
    title: "",
    description: "",
    raisedBy: "",
    status: "",
  });
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    error: "",
  });
  const { user } = useContext(AppContext);

  const getAllTickets = async () => {
    try {
      const response = await axiosInstance.get("ticket/getTicktes/" + user._id);
      // console.log(response);
      setAllTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const raiseATicket = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/ticket/newTicket", {
        title: newTicketData.title,
        description: newTicketData.description,
        userId: user._id,
      });
      // console.log(response.data);
      setAllTickets((prev) => [...prev, response.data]);
      setAddTicket(false);
      setNewTicketData({ title: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  };

  async function addNewNote() {
    // e.preventDefault();
    if (newNote.length >= 3) {
      try {
        const response = await axiosInstance.patch("/ticket/updateTicket", {
          comment: newNote,
          ticketId: selectedTicket._id,
          userId: user._id,
        });
        // console.log(response.data);
        // console.log(selectedTicket);
        setNewNote("");
        setSelectedTicket((prev) => response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const updateTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch("/ticket/updateTicket", {
        status: selectedTicket.status,
        ticketId: selectedTicket._id,
        userId: user._id,
      });
      // console.log(response.data);
      selectedTicket(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.logged) getAllTickets();
  }, [user]);
  return (
    <div className='bg-violet-100 pt-16 w-full dark:bg-violet-950 text-sky-400'>
      <h2 className='text-center py-6 text-3xl'>Tickets</h2>
      <div className='w-4/5 mx-auto p-3 rounded-md flex flex-col gap-3 items-center justify-center border-2 border-slate-400'>
        {allTickets.length ? (
          <>
            {" "}
            <div className='w-full border-b-2 border-slate-400 grid grid-cols-2 sm:grid-cols-5 items-center justify-center p-2 text-center text-2xl text-blue-800 dark:text-blue-100'>
              <h2 className='col-span-1'>Title</h2>
              <h2 className='hidden sm:block col-span-3'>Description</h2>
              <h2 className='col-span-1'>Status</h2>
            </div>
            {allTickets.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedTicket(ele)}
                  className='w-full border-b border-slate-400 grid grid-cols-2 sm:grid-cols-5 items-center justify-center p-2 text-center text-xl text-cyan-700 dark:text-cyan-100 hover:bg-sky-300'
                >
                  <h3 className='col-span-1'>{ele.title}</h3>
                  <p className='hidden sm:block col-span-3'>{ele.description}</p>
                  <h3 className='col-span-1'>{ele.status}</h3>
                </div>
              );
            })}
          </>
        ) : (
          <p className='col-span-6 text-center py-10 text-3xl text-rose-400'>
            No tickets to show
          </p>
        )}
      </div>
      {!addTicket &&  user.role == 'customer' && (
        <div className='flex items-center justify-center p-4 '>
          <button
            onClick={() => setAddTicket(true)}
            className='bg-rose-400 text-white p-2 text-xl rounded-lg border border-rose-400 hover:bg-rose-100 hover:text-rose-500'
          >
            Raise a ticket
          </button>
        </div>
      )}
      {user.logged && user.role == "customer" && (
        <div
          className={`${
            addTicket ? "" : "hidden"
          } flex items-start justify-center p-3 absolute w-full h-dvh bg-black/80 top-0 right-0 z-40`}
        >
          <form
            action=''
            onSubmit={(e) => raiseATicket(e)}
            className='flex items-center flex-col justify-start gap-10 bg-slate-400 text-slate-700 dark:text-yellow-50 p-10 relative rounded-md overflow-hidden'
          >
            <span
              onClick={() => setAddTicket(false)}
              className='absolute top-0 right-0 text-3xl p-1 bg-slate-700 rounded-bl-xl hover:bg-rose-400 text-white cursor-pointer'
            >
              <RiCloseLine />
            </span>{" "}
            <h3 className='py-4 text-center text-2xl'>Raise a new ticket</h3>
            <input
              name='title'
              type='text'
              value={newTicketData.title}
              required
              placeholder='Enter title'
              onChange={(e) =>
                setNewTicketData((prev) => ({ ...prev, title: e.target.value }))
              }
              className='col-span-3 py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
            />
            <textarea
              placeholder='Enter ticket dexcription'
              name='description'
              value={newTicketData.description}
              required
              onChange={(e) =>
                setNewTicketData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className='col-span-3 py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
            ></textarea>
             <button className='w-full p-2 bg-emerald-600 text-2xl text-white rounded-md hover:bg-emerald-500'>
              Raise Ticket
            </button> 
          </form>
        </div>
      )}
      {selectedTicket && (
        <div
          className={`flex items-start justify-center p-3 absolute w-full h-dvh bg-black/80 top-0 right-0 z-40`}
        >
          <form
            action=''
            onSubmit={(e) => updateTicket(e)}
            className='flex items-start flex-wrap justify-center gap-8 bg-slate-400 text-slate-700 dark:text-yellow-50 max-h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-track]:bg-gray-100 p-10 relative rounded-md overflow-hidden'
          >
            {" "}
            <span
              onClick={() => setSelectedTicket(null)}
              className='absolute top-0 right-0 text-3xl p-1 bg-slate-700 rounded-bl-xl hover:bg-rose-400 text-white cursor-pointer'
            >
              <RiCloseLine />
            </span>{" "}
            <div className='flex items-center flex-col justify-start gap-4'>
              <label htmlFor='title'>Title : </label>
              <input
                type='text'
                name='title'
                placeholder='Enter title'
                value={selectedTicket.title}
                onChange={(e) =>
                  setSelectedTicket((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className='col-span-3 py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
              />
              <label htmlFor='description'>Description</label>
              <textarea
                name='description'
                placeholder='Enter description'
                value={selectedTicket.description}
                onChange={(e) =>
                  setSelectedTicket((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className='col-span-3 min-h-32 py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
              ></textarea>
              <label htmlFor='status'>Status :</label>
              <input
                type='text'
                name='status'
                disabled={user.role == "customer"}
                onChange={(e) =>
                  setSelectedTicket((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                placeholder='Enter title'
                value={selectedTicket.status}
                className='col-span-3 py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
              />
            </div>
            <div className='flex flex-col items-center justify-center gap-4'>
              {" "}
              <label htmlFor=''>Notes :</label>
              <div className='w-full flex flex-col items-center justify-center gap-2'>
                {selectedTicket && selectedTicket.comments.length
                  ? selectedTicket.comments.map((ele, idx) => {
                      return (
                        <div
                          key={idx}
                          className='bg-sky-600 text-white rounded-lg w-full px-2 text-end'
                        >
                          <h3 className='text-xl text'>{ele.note}</h3>
                          <span className='text-xs'>
                            {user.role == "customer"
                              ? ele.addedBy == user._id
                                ? "-You"
                                : "-Admin"
                              : ele.addedBy == user._id
                              ? "-You"
                              : "-Customer"}
                          </span>
                        </div>
                      );
                    })
                  : ""}
              </div>
              <input
                type='text'
                name='comment'
                placeholder='Add Note'
                value={newNote}
                onChange={(e) => setNewNote((prev) => e.target.value)}
                className='col-span-3 py-2 px-3 text-center rounded-lg shadow-md shadow-cyan-900 outline-none focus:ring-2 ring-violet-600 font-medium dark:bg-cyan-800'
              />
              <p
                className='w-full p-2 bg-sky-400 text-center rounded-md text-xl text-white hover:bg-sky-700'
                onClick={() => addNewNote()}
              >
                Add
              </p>
            </div>
            {user.role != "customer" && (
              <button className='w-full p-2 bg-emerald-400 text-center rounded-md text-xl text-white hover:bg-emerald-700'>
                Update
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default Ticket;
