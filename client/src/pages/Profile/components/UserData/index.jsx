import React from "react";

import "./style.css";

const UserData = ({ profile }) => {
    return (
        <div className="profile-data">
            <div>name</div>
            <div>{profile.username || "error on recieving profile"}</div>
            <div>bio</div>
        </div>
    );
};

export default UserData;
