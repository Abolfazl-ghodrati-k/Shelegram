import React, { useContext, useMemo } from "react";
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

    const activeFriend = friendList.find((friend) => friend?.userid === userid);
    const chatsMessages = messages.filter(
        (msg) =>
            msg.to === activeFriend?.userid || msg.from === activeFriend?.userid
    );

    return activeFriend ? (
        <div className="chat-container">
            {chatsMessages.length > 0 ? (
                <>
                    <div style={{ flexGrow: 1 }}> </div>
                    <div
                        key={`chat:${activeFriend.username}`}
                        className="messages-container"
                    >
                        {chatsMessages.map((message, index) => (
                            <p
                                key={`msg:${index}`}
                                className={`${
                                    message.to === userid
                                        ? "my-message"
                                        : "friends-message"
                                } message`}
                            >
                                {message.content}
                            </p>
                        ))}
                    </div>
                </>
            ) : (
                <div className="no-message-container">
                    <p>
                        No message found 🤷‍♂️ <br />
                        start chatting with <span>
                            {activeFriend.username}
                        </span>{" "}
                        ⬇️
                    </p>
                </div>
            )}
            <ChatBox userid={userid} />
        </div>
    ) : <p>Some error happened please sign out and try again</p>;
}

export default Chat;
