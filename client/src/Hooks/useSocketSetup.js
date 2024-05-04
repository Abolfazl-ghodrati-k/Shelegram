import { useContext, useLayoutEffect } from "react";
import { socket } from "../socket";
import { AccountContext } from "../Context/AccountContext";

export default function useSocketSetup(setFriendList, setMessages) {
    const { setUser } = useContext(AccountContext);

    useLayoutEffect(() => {
        socket.connect();
        socket.emit("initialize_user", ({ friends, messages }) => {
            console.log(friends);
            console.log(messages);
            setFriendList(friends);
            setMessages(messages);
        });
        socket.on("friends", (FriendList) => {
            setFriendList(FriendList);
        });
        socket.on("messages", (messages) => {
            setMessages(messages);
        });
        socket.on("recievedm", (message) => {
            setMessages((prev) => [message, ...prev]);
        });
        socket.on("connected", (status, username) => {
            setFriendList((friends) =>
                friends.map((friend) => {
                    if (friend?.username === username) {
                        friend.connected = status;
                    }
                    return friend;
                })
            );
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
