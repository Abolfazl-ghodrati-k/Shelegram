import React, { useContext, useRef, useEffect } from "react";
import { FriendContext } from "../../Home";
import { MessagesContext } from "../../Home";
import ChatBox from "../ChatBox/ChatBox";
import "./style.css";

function Chat({ userid }) {
    const { friendList } = useContext(FriendContext);
    const { messages } = useContext(MessagesContext);

    const activeFriend = friendList.find((friend) => friend.userid === userid);

    return activeFriend ? (
        <div className="chat-container">
            <div style={{flexGrow: 1}}> </div>
            <div className="chat-wrapper">
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
        </div>
    ) : null;
}

export default Chat;
