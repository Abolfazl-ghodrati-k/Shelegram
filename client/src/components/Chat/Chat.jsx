import React, { useContext, useRef, useEffect, useMemo } from "react";
import { FriendContext } from "../../Home";
import { MessagesContext } from "../../Home";
import ChatBox from "../ChatBox/ChatBox";
import "./style.css";

function Chat({ userid: userId }) {
    const { friendList } = useContext(FriendContext);
    const { messages } = useContext(MessagesContext);
    const userid = useMemo(() => {
        if (userId) {
            return userId;
        }
        return localStorage.getItem("friendId");
    }, [userId]);

    const activeFriend = friendList.find((friend) => friend.userid === userid);

    return activeFriend ? (
        <div className="chat-container">
            <div style={{ flexGrow: 1 }}> </div>
            <div
                key={`chat:${activeFriend.username}`}
                className="messages-container"
            >
                {messages
                    .filter(
                        (msg) =>
                            msg.to === activeFriend.userid ||
                            msg.from === activeFriend.userid
                    )
                    .map((message, index) => (
                        <p key={`msg:${index}`}>{message.content}</p>
                    ))}
            </div>
            <ChatBox userid={userid} />
        </div>
    ) : null;
}

export default Chat;
