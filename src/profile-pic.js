import React from "react";

export function ProfilePic({ firstName, lastName, imageUrl }) {
    imageUrl = imageUrl || "/default.jpeg";
    return (
        <div>
            <h2>
                {firstName} {lastName}
            </h2>
            <img src={imageUrl} alt={lastName} />
        </div>
    );
}
