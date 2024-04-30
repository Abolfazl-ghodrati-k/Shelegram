import SideBar from "./components/SideBar/SideBar";
import Chat from "./components/Chat";
import { createContext, useState } from "react";
import useSocketSetup from "./Hooks/useSocketSetup";

export const FriendContext = createContext();
export const MessagesContext = createContext();

function Home() {
    const [friendList, setFriendList] = useState([]);
    const [Messages, setMessages] = useState([]);
    const [friendIndex, setfriendIndex] = useState(0);
    useSocketSetup(setFriendList, setMessages);
    return (
        <FriendContext.Provider value={{ friendList, setFriendList }}>
            <section>
                <SideBar />
                {/* <div>
                    <MessagesContext.Provider>
                        <Chat userId={friendList[friendIndex]} />
                    </MessagesContext.Provider>
                </div> */}
            </section>
        </FriendContext.Provider>
    );
}

export default Home;
