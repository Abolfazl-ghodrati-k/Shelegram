import { useContext, useEffect } from "react";
import { socket } from "../socket";
import { AccountContext } from "../Context/AccountContext";

export default function useSocketSetup({ setFriendList, setMessages }) {
	const { setUser } = useContext(AccountContext);
	useEffect(() => {
		socket.connect();
		socket.on("friends", (FriendList) => {
			setFriendList(FriendList);
		});
		socket.on("messages", (messages) => {
			setMessages(messages);
		});
		socket.on("dm", (message) => {
			setMessages((prev) => [message, ...prev]);
		});
		socket.on("connected", (status, username) => {
			setFriendList((prev) => {
				const friends = [...prev];
				return friends.map((friend) => {
					if (friend.username === username) {
						friend.status = status;
					}
					return friend;
				});
			});
		});
		socket.on("connect_error", () => {
			setUser({ loggedIn: false });
		});
		return () => {
			socket.off("connect_error");
			socket.off("messages");
			socket.off("connected");
			socket.off("friends");
		};
	}, [setUser, setMessages, setFriendList]);
}
