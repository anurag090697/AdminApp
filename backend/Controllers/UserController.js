/** @format */

import userModel from "../Models/UserProfile.js";
import bcrypt from "bcrypt";
import { generateJwtToken } from "../Services/jwtToken.js";
import jwt from "jsonwebtoken";
import ticketModel from "../Models/Ticket.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, mobile } = req.body;
    const hashPassword = await bcrypt.hash(password, 11);
    // password = hashPassword;
    const findEmail = await userModel.findOne({ email });
    if (findEmail) {
      return res
        .status(409)
        .json({ error: "Email already registered.", message: "" });
    }
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
      role,
      mobile,
    });
    // console.log(newUser);
    await newUser.save();

    res.status(201).json({ message: "User added successfully", error: "" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "", error: "user not found" });
    }
    const matchPassword = await bcrypt.compare(password, findUser.password);
    if (!matchPassword) {
      return res.status(401).json({ error: "Incorrect password", message: "" });
    }

    const newToken = generateJwtToken(findUser);

    findUser.password = null;
    res
      .cookie("adminApp", newToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 1000,
        secure: true,
      })
      .status(202)
      .json(findUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const alreadyLoggedUser = async (req, res) => {
  try {
    const { adminApp } = req.cookies;
    // console.log(adminApp);
    const verifyToken = jwt.verify(adminApp, process.env.JWT_SECRET);
    if (!adminApp || !verifyToken) {
      return res.status(404).json({ message: "", error: "Not logged" });
    }
    const findUser = await userModel.findById(verifyToken.userId);
    if (!findUser) {
      return res.status(404).json({ message: "", error: "User not found." });
    }
    res.status(200).json(findUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { formData, userId } = req.body;
    // console.log(formData);
    delete formData.password;
    const findUser = await userModel.findByIdAndUpdate(userId, formData, {
      new: true,
    });
    // console.log(formData);

    res.status(202).json(findUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    // console.log(userId);
    const removeProfile = await userModel.findByIdAndDelete(userId, {
      new: true,
    });
    // console.log(removeProfile);
    res.status(202).json({ message: "Profile Deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // const { adminApp } = req.cookies;
    // // console.log(adminApp);
    // const verifyToken = jwt.verify(adminApp, process.env.JWT_SECRET);
    // if (!adminApp || !verifyToken) {
    //   return res.status(404).json({ message: "", error: "Not logged" });
    // }
    const { id } = req.params;
    const findUser = await userModel.findById(id);
    if (!findUser || findUser.role == "customer") {
      return res.status(404).json({ message: "", error: "User not found." });
    }
    const allUsers = await userModel.find({ _id: { $ne: findUser._id } }, [
      "name",
      "email",
      "role",
      "mobile",
    ]);
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("adminApp", {
      httpOnly: true,
      sameSite: "strict",
    });
    res
      .status(200)
      .json({ message: "Logout successfully", logged: false, role: null });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getNumberData = async (req, res) => {
  try {
    const findNumUser = await userModel.find({});
    const findTickets = await ticketModel.find({});

    const solvedTickets = await ticketModel.find({ status: "closed" });
    res.status(200).json({
      users: findNumUser.length,
      tickets: findTickets.length,
      resolved: solvedTickets.length,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
