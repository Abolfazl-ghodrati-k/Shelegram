import SideBar from "./components/SideBar/SideBar";
import { createContext, useState } from "react";
import useSocketSetup from "./Hooks/useSocketSetup";

export const FriendContext = createContext();
export const MessagesContext = createContext();

function Home() {
    const [friendList, setFriendList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [friendIndex, setFriendIndex] = useState(0);
    useSocketSetup(setFriendList, setMessages);
    
    return (
        <FriendContext.Provider value={{ friendList, setFriendList, friendIndex, setFriendIndex }}>
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
