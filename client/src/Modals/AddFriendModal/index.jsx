import React, { useCallback, useContext, useRef, useState } from "react";
import { FriendContext } from "../../Home";
import "./style.css";
import { GrClose } from "react-icons/gr";
import { createPortal } from "react-dom"
import { Formik } from "formik";
import { socket } from "../../socket";
import* as Yup from "yup"
import TextField from "../../components/Login/TextField";
import useOutsideClick from "../../Hooks/useOutSideClick";

const AddFrindModal = ({ onClose }) => {
    const [error, seterror] = useState("");
    const { setFriendList } = useContext(FriendContext);
    const modalRef = useRef(null)

    const closeModal = useCallback(() => {
        seterror("");
        onClose();
    }, [onClose]);

    useOutsideClick(modalRef, closeModal)

    return createPortal(
        <dialog className="modal" open={true} onClose={onClose} ref={modalRef}>
            <div className="add-friend-modal">
                <div className="add-friend-modal-header">
                   <h3>Add a friend</h3>
                   <GrClose className="clickable-icons" onClick={onClose} />
                </div>
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
                        <div>
                            <p>{error}</p>
                            <TextField
                                name="friendName"
                                label={"Friends name"}
                                placeholder="enter your friends name"
                            />
                        </div>
                        <button type="submit" className="primary-button">Add</button>
                    </form>
                </Formik>
            </div>
        </dialog>,
        document.body
    );
};

export default AddFrindModal;
