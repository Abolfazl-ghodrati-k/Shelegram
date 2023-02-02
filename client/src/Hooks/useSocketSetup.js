import { useContext, useEffect } from "react";
import { socket } from "../socket";
import { AccountContext } from "../Context/AccountContext";
import { AccountContext } from "../Home";
export default function useSocketSetup() {
	const { setUser } = useContext(AccountContext);
	const { setFriendList } = useContext(FriendContext);
	useEffect(() => {
		socket.connect();
		socket.on("friends", FriendList => {
			setFriendList(FriendList)
		})
		socket.on("connected", (status, username) => {
			setFriendList(prev => {
				const friends = [...prev]
				return friends.map(friend => {
					if(friend.username === username){
						friend.status = status
					}
					return friend
				})
			})
		})
		socket.on("connect_error", () => {
			setUser({ loggedIn: false });
		});
		return () => socket.off("connect_error");
	}, [setUser]);
}
