import SideBar from "./components/SideBar/SideBar";
import { createContext, useState } from "react";
import useSocketSetup from "./Hooks/useSocketSetup";
import Chat from "./components/Chat/Chat";
import { RxHamburgerMenu } from "react-icons/rx";
import withAuth from "./components/PrivateRoutes";

export const FriendContext = createContext();
export const MessagesContext = createContext();

function Home() {
  const [showSideBar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSideBar);
  };
  const [friendList, setFriendList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friendIndex, setFriendIndex] = useState(null);
  useSocketSetup(setFriendList, setMessages);

  const buttonClassNames = `button-sidebar ${
    showSideBar ? "button-sidebar-show" : "button-sidebar-hide"
  }`;

  return (
    <FriendContext.Provider
      value={{ friendList, setFriendList, friendIndex, setFriendIndex }}
    >
      <section className="app-container">
        <SideBar showSideBar={showSideBar} setShowSideBar={setShowSidebar} />
        <RxHamburgerMenu
          onClick={toggleSidebar}
          size={30}
          className={buttonClassNames}
        />
        <MessagesContext.Provider value={{ messages, setMessages }}>
          {friendIndex && <Chat userid={friendIndex} />}
        </MessagesContext.Provider>
      </section>
    </FriendContext.Provider>
  );
}

export default withAuth(Home);
