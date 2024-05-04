import { useCallback, useContext, useState } from "react";
import { FriendContext } from "../../Home";
import { CiChat1 } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import AddFriendModal from "../../Modals/AddFriendModal";
import "./style.css";

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { friendList, setFriendIndex } = useContext(FriendContext);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const changeActiveFriendIndex = useCallback(
        (id) => {
            setFriendIndex(id);
            localStorage.setItem("friendId", id);
        },
        [setFriendIndex]
    );

    return (
        <>
            <aside className="sidebar-container">
                <div className="sidebar-add-friend">
                    <h3>Add Friend</h3>
                    <button onClick={onOpen}>
                        <CiChat1 size={20} color="black" />
                    </button>
                </div>
                {/* <Divider /> */}
                {friendList.length > 0 ? (
                    <div className="friend-list-container">
                        {friendList.map((friend) => (
                            <div
                                key={friend.username}
                                className="friend-container"
                                onClick={() =>
                                    changeActiveFriendIndex(friend.userid)
                                }
                            >
                                <p>{friend.username}</p>
                                <FaCircle
                                    className="status-indicator"
                                    color={
                                        friend.connected === "true"
                                            ? "green"
                                            : "red"
                                    }
                                    size={10}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No friends click Add Friend to Start conversation</p>
                )}
            </aside>
            {isOpen && <AddFriendModal onClose={onClose} />}
        </>
    );
}

export default SideBar;
