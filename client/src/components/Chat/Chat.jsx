import React, { useContext, useRef, useEffect } from "react";
import { FriendContext } from "../../Home";
import { MessagesContext } from "../../Home";
import { Text, VStack } from "@chakra-ui/react";
import ChatBox from "../ChatBox";

function Chat({ userid }) {
    const { friendList } = useContext(FriendContext);
    const { messages } = useContext(MessagesContext);
    const bottomDiv = useRef(null);
    // useEffect(() => {
    //     // if (Messages[0].from == userId) {
    //     bottomDiv.current.scrollIntoView();
    //     // }
    //     // else {

    //     // }
    // });

    const activeFriend = friendList.find((friend) => friend.userid === userid);

    return activeFriend ? (
        <div>
            <div>
                <div key={`chat:${activeFriend.username}`}>
                    <div ref={bottomDiv} />
                    {messages
                        .filter(
                            (msg) =>
                                msg.to === activeFriend.userId ||
                                msg.from === activeFriend.userId
                        )
                        .map((message, index) => (
                            <p key={`msg:${index}`}>{message.content}</p>
                        ))}
                </div>
                {/* <ChatBox userId={userId} /> */}
            </div>
        </div>
    ) : null;
}

export default Chat;
