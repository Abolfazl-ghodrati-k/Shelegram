import { Formik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { socket } from "../socket";
import { MessagesContext } from "../Home";

function ChatBox({ userId }) {
    const { setMessages } = useContext(MessagesContext);
    return (
        <Formik
            initialValues={{ message: "" }}
            validationSchema={Yup.object({
                message: Yup.string().min(1).max(255),
            })}
            onSubmit={(values, actions) => {
                const message = {
                    to: userId,
                    from: null,
                    content: values.message,
                };
                socket.emit("dm", message);
                setMessages((prev) => [message, ...prev]);
                actions.resetForm();
            }}
        >
            <HStack as={Form} w="100%" pb="1rem" px="1.2em">
                <input name="message" placeholder="Type message here..." />
                <button type="submit">Send</button>
            </HStack>
        </Formik>
    );
}

export default ChatBox;
