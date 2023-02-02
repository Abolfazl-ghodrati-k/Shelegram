import { io } from "socket.io-client";

export const socket = new io("http://localhost:5050", {
	autoConnect: false,
	withCredentials: true,
});
