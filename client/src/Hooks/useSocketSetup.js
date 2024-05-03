import { useContext, useLayoutEffect } from "react";
import { socket } from "../socket";
import { AccountContext } from "../Context/AccountContext";

export default function useSocketSetup( setFriendList, setMessages ) {
    console.log(socket);
    const { setUser } = useContext(AccountContext);
	
    useLayoutEffect(() => {
        socket.connect();
        socket.emit("initialize_user", ({ friends, messages }) => {
            console.log(friends)
            setFriendList(friends);
            setMessages(messages)
        })
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
            console.log(username)
        });

        socket.on("connect_error", () => {
            if (!localStorage.getItem("token")) {
                setUser({ loggedIn: false });
            }
        });

        return () => {
            socket.off("connect_error");
            socket.off("messages");
            socket.off("connected");
            socket.off("friends");
        };
    }, [setUser, setMessages, setFriendList]);
}
