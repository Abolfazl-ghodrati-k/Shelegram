import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import { createContext, useState } from "react";
import useSocketSetup from "./Hooks/useSocketSetup";

export const FriendContext = createContext();
export const MessagesContext = createContext();

function Home() {
	const [FriendList, setFriendList] = useState([]);
	const [Messages, setMessages] = useState([]);
	const [friendIndex, setfriendIndex] = useState(0);
	useSocketSetup(setFriendList,setMessages);
	return (
		<FriendContext.Provider value={{ FriendList, setFriendList }}>
			<Grid templateColumns={"repeat(10,1fr)"} as={Tabs} onChange={index => setFriendIndex(index)}>
				<GridItem colSpan={3} borderRight={"1px solid gray"}>
					<SideBar />
				</GridItem>
				<GridItem colSpan={7} maxH="95vh">
					<MessagesContext.Provider>
						<Chat userId={FriendList[friendIndex]}/>
					</MessagesContext.Provider>
				</GridItem>
			</Grid>
		</FriendContext.Provider>
	);
}

export default Home;
