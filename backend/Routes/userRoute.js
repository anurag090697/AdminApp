/** @format */

import { Router } from "express";
import {
  alreadyLoggedUser,
  deleteProfile,
  editProfile,
  getAllUsers,
  getNumberData,
  logoutUser,
  registerUser,
  userLogin,
} from "../Controllers/UserController.js";

const userRoute = Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", userLogin);
userRoute.get("/checkLogged", alreadyLoggedUser);
userRoute.patch("/editProfile", editProfile);
userRoute.delete("/deleteUser", deleteProfile);
userRoute.get("/fetchAllUsers", getAllUsers);
userRoute.get('/logout',logoutUser);
userRoute.get('/getNumberData', getNumberData);

export default userRoute;
