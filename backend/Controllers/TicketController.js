/** @format */

import ticketModel from "../Models/Ticket.js";
import userModel from "../Models/UserProfile.js";

export const getTickets = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await userModel.findById(id);
    if (!findUser) {
      return res.status(404).json({ message: "", error: "User not found" });
    }
    let allTickets;
    if (findUser.role === "customer") {
      allTickets = await ticketModel.find({ raisedBy: findUser._id });
    } else {
      allTickets = await ticketModel.find({});
    }
    res.status(200).json(allTickets);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const raiseNewTicket = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    // console.log(title, description, userId);
    const findUser = await userModel.findById(userId);
    if (!findUser || findUser.role != "customer") {
      return res
        .status(401)
        .json({ message: "", error: "User not authorised to raise a ticket." });
    }
    const newTicket = new ticketModel({ title, description, raisedBy: userId });
    await newTicket.save();
    res.status(200).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { comment, ticketId, status, userId } = req.body;
    // console.log(comment, ticketId, userId);
    const findTicket = await ticketModel.findById(ticketId);
    const findUser = await userModel.findById(userId);
    if (!findTicket) {
      res
        .status(404)
        .json({ message: "", error: "Ticket not found try again" });
    }
    if (comment) {
      const commentObj = {
        note: comment,
        image: comment.image || null,
        addedBy: findUser._id,
        toa: new Date().toLocaleString(),
      };
      findTicket.comments.push(commentObj);
    }
    if (status && findUser.role != "customer") {
      findTicket.status = status;
    }
    await findTicket.save();
    // console.log(findTicket);
    res.status(202).json(findTicket);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
