import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers, acceptFriendship, endFriendship } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const wannabes = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == false)
    );
    const friends = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == true)
    );

    useEffect(() => {
        dispatch(receiveUsers());
    }, []);

    if (!wannabes || !friends) {
        return null;
    }

    return (
        <div>
            <br />
            <br />
            <div>
                <ul>
                    {wannabes.map(u => (
                        <li key={u.id}>
                            ({u.first_name},{u.last_name},
                            <img src={u.image_url} />
                            );
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <ul>
                    {friends.map(u => (
                        <li key={u.id}>
                            ({u.first_name},{u.last_name},
                            <img src={u.image_url} />
                            );
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
