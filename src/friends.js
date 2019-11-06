import React, { useEffect } from "react";
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
        <div className="friends-container">
            <br />
            <br />
            <br />
            <div>
                <h3>Friends Requests</h3>
                <div className="wannabes">
                    {wannabes.map(u => (
                        <div key={u.id}>
                            <h4>
                                {u.first_name} {u.last_name}
                            </h4>
                            <img src={u.image_url} />
                            <button
                                onClick={() => {
                                    dispatch(acceptFriendship(u.id));
                                }}
                            >
                                Accept Friendship
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3>Current Friends</h3>
                <div className="friends">
                    {friends.map(u => (
                        <div key={u.id}>
                            <h4>
                                {u.first_name} {u.last_name}
                            </h4>
                            <img src={u.image_url} />
                            <button
                                onClick={() => {
                                    dispatch(endFriendship(u.id));
                                }}
                            >
                                End Friendship
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
