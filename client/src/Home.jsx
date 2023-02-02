import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import { createContext, useState } from "react";
import useSocketSetup from './Hooks/useSocketSetup'

export const FriendContext = createContext();

function Home() {
	const [FriendList, setFriendList] = useState([
		
	]);
	useSocketSetup()
	return (
		<FriendContext.Provider value={{ FriendList, setFriendList }}>
			<Grid templateColumns={"repeat(10,1fr)"} as={Tabs}>
				<GridItem colSpan={3} borderRight={"1px solid gray"}>
					<SideBar />
				</GridItem>
				<GridItem colSpan={7}>
					<Chat />
				</GridItem>
			</Grid>
		</FriendContext.Provider>
	);
}

export default Home;
