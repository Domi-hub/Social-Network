import React from "react";

export function ProfilePic({ firstName, lastName, imageUrl, onClick }) {
    imageUrl = imageUrl || "/default.jpeg";
    return (
        <div>
            <img src={imageUrl} alt={lastName} onClick={onClick} />
        </div>
    );
}
