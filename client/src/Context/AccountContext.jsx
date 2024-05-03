import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const AccountContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleAuthorization = async () => {
        const response = await axios.get("/auth/login");
        if (response.data) {
            if (response.data.loggedIn) {
                setUser({
                    loggedIn: response.data.loggedIn,
                    token: response.data.token,
                    username: response.data.username,
                });
                navigate("/home");
            }
        } else {
            setUser({ loggedIn: false });
        }
    };

    useEffect(() => {
        setLoading(true);
        handleAuthorization();
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {loading ? "Loading" : children}
        </AccountContext.Provider>
    );
};

export default UserContext;
