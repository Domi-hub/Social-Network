import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import axios from "axios";

export default function Findpeople() {
    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        let ignore = false;
        (async () => {
            console.log("userInput: ", userInput);
            const { data } = await axios.get("/api/users/" + userInput);
            console.log("Data: ", data);
            if (!userInput) {
                // const { data } = await axios.get("/api/users/");
                // setUsers(data);
            } else {
                const { data } = await axios.get("/api/users/" + userInput);
                if (!ignore) {
                    setUsers(data);
                } else {
                    console.log("ignored!!!");
                }
            }
        })();
        return () => {
            console.log("cleaning up", userInput);
            ignore = true;
        };
    }, [userInput]);

    return (
        <div className="find-people">
            <h1>Find Lemoniac</h1>
            <h3>Check out last signers</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.first_name}
                        {user.last_name}
                        <img src={user.image_url} />
                    </li>
                ))}
            </ul>
            <h3>Search</h3>
            <input
                name="user-input"
                type="text"
                onChange={e => setUserInput(e.target.value)}
            />
        </div>
    );
}
