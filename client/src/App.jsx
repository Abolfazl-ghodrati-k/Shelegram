import Views from "./components/Views";
import UserContext from "./Context/AccountContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
    return (
        <UserContext>
            <Views />
            <ToastContainer />
        </UserContext>
    );
}

export default App;
