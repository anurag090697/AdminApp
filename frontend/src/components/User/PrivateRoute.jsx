/** @format */

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  return user.logged ? children : navigate("/login");
}

export default PrivateRoute;
