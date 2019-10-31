import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ userId }) {
    const [status, setStatus] = useState("Make Friend Request");

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/get-initial-status/" + userId);
            if (!data) {
                setStatus("Make Friend Request");
            } else if (data.accepted == false) {
                if (userId == data.receiver_id) {
                    setStatus("Cancel Friend Request");
                } else {
                    setStatus("Accept Friend Request");
                }
            } else {
                setStatus("End Friendship");
            }
        })();
    }, [userId]);

    function handleFriendRequest() {
        (async () => {
            try {
                if (status === "Make Friend Request") {
                    await axios.post("/send-friend-request/" + userId);
                    setStatus("Cancel Friend Request");
                } else if (status === "Accept Friend Request") {
                    await axios.post("/accept-friend-request/" + userId);
                    setStatus("End Friendship");
                } else if (
                    ["Cancel Friend Request", "End Friendship"].includes(status)
                ) {
                    await axios.post("/end-friendship/" + userId);
                    setStatus("Make Friend Request");
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }

    return <button onClick={() => handleFriendRequest()}>{status}</button>;
}
