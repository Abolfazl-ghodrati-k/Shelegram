import React, { useContext, useRef } from "react";
import { AccountContext } from "../../Context/AccountContext";
import withAuth from "../../components/PrivateRoutes";
import "./style.css";

import ProfilePictures from "./components/ProfilePictures";
import UserData from "./components/UserData";

import { LuImagePlus } from "react-icons/lu";

const Profile = () => {
    const { user } = useContext(AccountContext);

    const inputRef = useRef(null);

    const handleOpenFileSelect = () => {
        if (inputRef?.current) {
            inputRef?.current?.click();
        }
    };

    const handleImageUpload = (e) => {
        const newImage = e.target.files[0];
        if (newImage) {
            // TODO: handle profile updating here
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-images">
                <ProfilePictures images={[]} />
                <label htmlFor="profile-image" onClick={handleOpenFileSelect}>
                    <LuImagePlus size={20} color="white" />
                </label>
                <input
                    ref={inputRef}
                    onChange={handleImageUpload}
                    multiple={false}
                    type="file"
                    name="profile-image"
                    accept="image/*"
                />
            </div>
            <UserData
                profile={{ ...user.profile, username: user.username } || null}
            />
        </div>
    );
};

export default withAuth(Profile);
