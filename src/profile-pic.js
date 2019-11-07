import React from "react";

export function ProfilePic({
    firstName,
    lastName,
    imageUrl,
    className,
    onClick
}) {
    imageUrl = imageUrl || "/default.jpeg";
    return (
        <div>
            <img
                className={className}
                src={imageUrl}
                alt={firstName + lastName}
                onClick={onClick}
            />
        </div>
    );
}
