import axios from "./axios";

export async function receiveUsers() {
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "RECEIVE_USERS",
        users: data
    };
}

export async function acceptFriendship({ userId }) {
    const { data } = await axios.post("/accept-friend-request", {
        userId: userId
    });
    console.log("Accept my friend request: ", data);
    return {
        type: "ACCEPT_FRIEND",
        userId: userId
    };
}

export async function endFriendship({ userId }) {
    const { data } = await axios.post("/friends-wannabes", { userId: userId });
    console.log("End friendship: ", data);
    return {
        type: "END_FRIENDSHIP",
        userId: userId
    };
}
