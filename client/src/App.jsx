import { useEffect } from "react";
import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";
import UserContext from "./Context/AccountContext";

function App() {
	// useEffect(() => {
	// 	fetch('http://localhost:5050/auth/clearcookie',{
	// 		credentials: 'include'
	// 	}).then(r => r.json).then(res => console.log(res))
	// },[])
	return (
		<UserContext>
			<div>
				<Views />
				<ToggleColorMode />
			</div>
		</UserContext>
	);
}

export default App;
