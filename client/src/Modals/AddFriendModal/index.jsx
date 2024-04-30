import React, { useCallback, useContext, useState } from "react";
import { FriendContext } from "../../Home";
import "./style.css";
import { GrClose } from "react-icons/gr";
import { createPortal } from "react-dom"
import { Formik } from "formik";
import { socket } from "../../socket";
import* as Yup from "yup"
import TextField from "../../components/Login/TextField";

const AddFrindModal = ({ onClose }) => {
    const [error, seterror] = useState("");
    const { setFriendList } = useContext(FriendContext);

    const closeModal = useCallback(() => {
        seterror("");
        onClose();
    }, [onClose]);

    return createPortal(
        <dialog className="modal" open={true} onClose={onClose}>
            <div className="add-friend-modal">
                <h3>Add a friend</h3>
                <GrClose />
                <Formik
                    initialValues={{ friendName: "" }}
                    validationSchema={Yup.object({
                        friendName: Yup.string()
                            .required("Username required")
                            .min(6, "Username too short!")
                            .max(28, "Username too long!"),
                    })}
                    onSubmit={({ values }) => {
                        socket.emit(
                            "add_friend",
                            values.friendName,
                            ({ done, errMsg, newUser }) => {
                                if (!done) {
                                    seterror(
                                        errMsg
                                            ? errMsg
                                            : "try again later bitch im busy"
                                    );
                                } else {
                                    if (newUser) {
                                        setFriendList();
                                    }
                                    closeModal();
                                    return;
                                }
                            }
                        );
                    }}
                >
                    <form>
                        <div w={"100%"}>
                            <p>{error}</p>
                            <TextField
                                name="friendName"
                                label={"Friends name"}
                                placeholder="enter your friends name"
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </Formik>
            </div>
        </dialog>,
        document.body
    );
};

export default AddFrindModal;
