import { io } from "socket.io-client";

export const socket = new io("http://localhost:5050", {
	autoConnect: true,
	withCredentials: true,
	reconnectionAttempts: 5,
	auth: {
		token: localStorage.getItem("token")
	}
});
