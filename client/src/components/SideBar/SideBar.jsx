import { useCallback, useContext, useEffect, useState } from "react";
import { FriendContext } from "../../Home";
import { CiChat1 } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import AddFriendModal from "../../Modals/AddFriendModal";
import "./style.css";
import { Link } from "react-router-dom";
import Thumbnail from "../Image";
import { AccountContext } from "../../Context/AccountContext";
import useIsMobile from "../../Hooks/useIsMobile";

function SideBar({ showSideBar, setShowSideBar }) {
  const [isOpen, setIsOpen] = useState(false);
  const { friendList, setFriendIndex } = useContext(FriendContext);
  const { user } = useContext(AccountContext);

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

  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      setShowSideBar(true);
    }
  }, [isMobile, setShowSideBar]);

  const profileImage = "111";
  const sidebarClassNames = `${
    isMobile
      ? showSideBar
        ? "mobile-sidebar-show"
        : "mobile-sidebar-hide"
      : showSideBar
      ? "desktop-sidebar-show"
      : "desktop-sidebar-hide"
  } ${isMobile ? "mobile-sidebar" : "desktop-sidebar"} sidebar`;

  return (
    <div className={sidebarClassNames}>
      <aside className="sidebar-container">
        <Link to="/profile" className="profile-button-container">
          <Thumbnail source={profileImage} />
          <p>{user.username}</p>
        </Link>
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
                onClick={() => changeActiveFriendIndex(friend.userid)}
              >
                <p>{friend.username}</p>
                <FaCircle
                  className="status-indicator"
                  color={friend.connected === "true" ? "green" : "red"}
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
    </div>
  );
}

export default SideBar;
