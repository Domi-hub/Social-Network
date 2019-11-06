import * as io from "socket.io-client";
import { getChatMessages, addChatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("getChatMessages", messages =>
            store.dispatch(getChatMessages(messages))
        );

        socket.on("addChatMessage", message =>
            store.dispatch(addChatMessage(message))
        );
    }
};
