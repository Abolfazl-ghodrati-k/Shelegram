import { useContext, useLayoutEffect } from "react";
import { socket } from "../socket";
import { AccountContext } from "../Context/AccountContext";

export default function useSocketSetup(setFriendList, setMessages) {
  const { setUser } = useContext(AccountContext);

  useLayoutEffect(() => {
    socket.connect();
    socket.on("friends", (FriendList) => {
      setFriendList(FriendList);
    });
    socket.emit("initialize_user", ({ friends }) => {
      setFriendList(friends);
    });
    socket.on("messages", (messages) => {
      console.log(messages);
      setMessages(messages);
    });
    socket.on("recievedm", (message) => {
      console.log("message");
      setMessages((prev) => {
        if (prev.some((prevMessage) => prevMessage.id === message.id)) {
          console.log(
            prev.some((prevMessage) => prevMessage.id === message.id),
            message
          );
          return prev;
        } else {
          return [message, ...prev];
        }
      });
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
