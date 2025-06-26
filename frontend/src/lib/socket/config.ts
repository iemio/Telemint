"use client";

import { io } from "socket.io-client";
import { SERVER_DOMAIN } from "../env";

const socket = io(SERVER_DOMAIN, {
  withCredentials: true,
});

export default socket;
