/** @format */

import "./App.css";
import Navbar from "./components/Common/Navbars";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Common/Home";
import { useContext, useEffect } from "react";
import { AppContext } from "./Context/AppContext";
import Sidebar from "./components/Common/Sidebar";
import Login from "./components/User/Login";
import PrivateRoute from "./components/User/PrivateRoute";
import SignUp from "./components/User/SignUp";
import { axiosInstance } from "./Context/AxiosConfig";
import Ticket from "./components/User/Ticket";
import Profile from "./components/User/Profile";
import Customers from "./components/User/Customers";

function App() {
  const { sidebar, user, setUser } = useContext(AppContext);

  const alreadyLogged = async () => {
    try {
      const response = await axiosInstance.get("/user/checkLogged");
      // console.log(response);
      setUser({ ...response.data, logged: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    alreadyLogged();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={`container min-w-full min-h-dvh relative overflow-x-hidden bg-violet-100 w-full dark:bg-violet-950 ${
          sidebar ? "md:pl-64" : ""
        }`}
      ><Navbar></Navbar>
        <Sidebar></Sidebar>
        
        <Routes>
          <Route
            element={
              <PrivateRoute>
                <Home></Home>
              </PrivateRoute>
            }
            path='/'
          ></Route>
          <Route element={<Login />} path='/login'></Route>
          <Route element={<SignUp />} path='/signUp'></Route>
          <Route
            element={
              <PrivateRoute>
                <Ticket />
              </PrivateRoute>
            }
            path='/tickets'
          ></Route>
          <Route
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
            path='/profile'
          ></Route>
          <Route
            element={
              <PrivateRoute>
                <Customers />
              </PrivateRoute>
            }
            path='/customers'
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
