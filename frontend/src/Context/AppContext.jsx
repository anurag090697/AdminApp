/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "./AxiosConfig";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [sidebar, setSidebar] = useState(true);
  const [user, setUser] = useState({ logged: false, role: null });
  const [dataNums, setDataNums] = useState({
    users: 0,
    customers: 0,
    resolved: 0,
  });

  const getNumbers = async () => {
    try {
      const response = await axiosInstance.get("/user/getNumberData");
      setDataNums(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNumbers();
  }, []);

  return (
    <AppContext.Provider
      value={{ sidebar, setSidebar, user, setUser, dataNums, setDataNums }}
    >
      {" "}
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
