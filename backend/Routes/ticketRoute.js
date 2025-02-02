/** @format */

import { Router } from "express";
import {
  getTickets,
  raiseNewTicket,
  updateTicket,
} from "../Controllers/TicketController.js";

const ticketRoute = Router();

ticketRoute.get("/getTicktes/:id", getTickets);
ticketRoute.post("/newTicket", raiseNewTicket);
ticketRoute.patch("/updateTicket", updateTicket);

export default ticketRoute;
