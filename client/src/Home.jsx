import SideBar from "./components/SideBar/SideBar";
import { createContext, useState } from "react";
import useSocketSetup from "./Hooks/useSocketSetup";
import Chat from "./components/Chat/Chat";
import useIsMobile from "./Hooks/useIsMobile";
import { RxHamburgerMenu } from "react-icons/rx";

export const FriendContext = createContext();
export const MessagesContext = createContext();

function Home() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    const [friendList, setFriendList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [friendIndex, setFriendIndex] = useState(0);
    useSocketSetup(setFriendList, setMessages);
    const isMobile = useIsMobile();

    return (
        <FriendContext.Provider
            value={{ friendList, setFriendList, friendIndex, setFriendIndex }}
        >
            <section className="app-container">
                <div
                    className={`${
                        isMobile
                            ? showSidebar
                                ? "mobile-sidebar-show"
                                : "mobile-sidebar-hide"
                            : showSidebar
                            ? "desktop-sidebar-show"
                            : "desktop-sidebar-hide"
                    } ${isMobile ? "mobile-sidebar" : "desktop-sidebar"} sidebar`}
                >
                    <SideBar />
                </div>
                <RxHamburgerMenu
                    onClick={toggleSidebar}
                    size={30}
                    className={`
                    button-sidebar
                    ${
                        showSidebar
                            ? "button-sidebar-show"
                            : "button-sidebar-hide"
                    }`}
                />
                <MessagesContext.Provider value={{ messages, setMessages }}>
                    <Chat userid={friendIndex} />
                </MessagesContext.Provider>
            </section>
        </FriendContext.Provider>
    );
}

export default Home;
