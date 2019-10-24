import React from "react";

export function ProfilePic({ firstName, lastName, imgUrl }) {
    console.log("props in ProfilePic: ", firstName, lastName, imgUrl);
    imgUrl = imgUrl || "/img/default.png"; //add picture called default.png in public, if picture is not defined the default picture will be used
    return (
        <div>
            <h2>
                I am the Profile Pic!!!
                {firstName}
            </h2>
            <img src={imgUrl} alt={lastName} />
        </div>
    );
}
