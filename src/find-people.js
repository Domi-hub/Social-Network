import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Findpeople() {
    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        let ignore = false;
        (async () => {
            if (!userInput) {
                const { data } = await axios.get("/api/users/");
                setUsers(data);
            } else {
                const { data } = await axios.get("/api/users/" + userInput);
                if (!ignore) {
                    setUsers(data);
                }
            }
        })();
        return () => {
            ignore = true;
        };
    }, [userInput]);

    return (
        <div className="find-people">
            <h1>Find People</h1>
            <div className="find-people-container">
                <h3>Check out last signers</h3>
                <ul className="find-people-pic">
                    {users.map(user => (
                        <li key={user.id}>
                            <div>
                                <a key={user.id} href={`/user/${user.id}`}>
                                    <img src={user.image_url} />
                                </a>
                            </div>
                            <div className="find-people-name">
                                {user.first_name} {user.last_name}
                            </div>
                        </li>
                    ))}
                </ul>

                <h3>Search</h3>
                <input
                    className="search-input"
                    name="user-input"
                    type="text"
                    onChange={e => setUserInput(e.target.value)}
                />
            </div>
        </div>
    );
}
