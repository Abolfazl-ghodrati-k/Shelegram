import { useEffect } from "react";
import ToggleColorMode from "./components/ToggleTheme/ToggleColorMode";
import Views from "./components/Views";
import UserContext from "./Context/AccountContext";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
    // useEffect(() => {
    // 	fetch('http://localhost:5050/auth/clearcookie',{
    // 		credentials: 'include'
    // 	}).then(r => r.json).then(res => console.log(res))
    // },[])
    return (
        <UserContext>
            <Views />
            <ToggleColorMode />
            <ToastContainer />
        </UserContext>
    );
}

export default App;
