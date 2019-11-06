import axios from "./axios";

export async function receiveUsers() {
    const { data } = await axios.get("/friends-wannabes");
    return {
        type: "RECEIVE_USERS",
        users: data
    };
}

export async function acceptFriendship(userId) {
    await axios.post("/accept-friend-request/" + userId);
    return {
        type: "ACCEPT_FRIEND",
        userId: userId
    };
}

export async function endFriendship(userId) {
    await axios.post("/end-friendship/" + userId);
    return {
        type: "END_FRIENDSHIP",
        userId: userId
    };
}

export async function getChatMessages(messages) {
    return {
        type: "GET_CHAT_MESSAGES",
        messages: messages.reverse()
    };
}

export async function addChatMessage(message) {
    return {
        type: "ADD_CHAT_MESSAGE",
        message: message
    };
}
