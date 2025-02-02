/** @format */

import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminApp_user",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    comments: [
      {
        note: {
          type: String,
          required: true,
        },
        image: { type: String },
        toa: { type: String },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "AdminApp_user" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ticketModel = mongoose.model("adminApp_Ticket", ticketSchema);

export default ticketModel;
