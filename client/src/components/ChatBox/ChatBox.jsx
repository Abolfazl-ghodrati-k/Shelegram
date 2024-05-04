import { Formik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { socket } from "../../socket";
import { MessagesContext } from "../../Home";
import TextField from "../Login/TextField";
import "./style.css";

function ChatBox({ userid }) {
    const { setMessages } = useContext(MessagesContext);
    return (
        <Formik
            initialValues={{ message: "" }}
            validationSchema={Yup.object({
                message: Yup.string().min(1).max(255),
            })}
            onSubmit={(values, actions) => {
                const message = {
                    to: userid,
                    from: null,
                    content: values.message,
                };
                socket.emit("dm", message);
                setMessages((prev) => [message, ...prev]);
                actions.resetForm();
            }}
        >
            {(formik) => (
                <form
                    onSubmit={formik.handleSubmit}
                    className="send-message-form"
                >
                    <TextField
                        name="message"
                        placeholder="Type message here..."
                    />
                    <button type="submit" className="primary-button">Send</button>
                </form>
            )}
        </Formik>
    );
}

export default ChatBox;
