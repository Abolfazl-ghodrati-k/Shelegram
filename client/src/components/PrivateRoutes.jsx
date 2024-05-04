import { Navigate } from "react-router-dom";
import { AccountContext } from "../Context/AccountContext";
import { useContext } from "react";

const withAuth = (WrappedComponent) => {
    const AuthComponent = () => {
        const { user } = useContext(AccountContext);
        const isAuth = user && user.loggedIn;
        return isAuth ? <WrappedComponent /> : <Navigate to={"/"} />;
    };
    return AuthComponent;
};

export default withAuth;
