/** @format */

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (!user.logged) {
      navigate("/login");
    }
  }, [user, navigate]);
  return children;
}

export default PrivateRoute;
