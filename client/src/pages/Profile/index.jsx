import React, { useContext } from "react";
import { AccountContext } from "../../Context/AccountContext";
import withAuth from "../../components/PrivateRoutes";

const Profile = () => {
    const { user } = useContext(AccountContext);
    console.log(user);
    return <div>Profile</div>;
};

export default withAuth(Profile);
