import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export function Chat() {
    const messages = useSelector(state => state.messages);
    const chat = useRef();
    console.log(messages);
    useEffect(() => {
        if (chat.current) {
            chat.current.scrollTop =
                chat.current.scrollHeight - chat.current.clientHeight;
        }
    }, [messages]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newChatMessage", e.target.value);
            e.target.value = "";
        }
    };

    if (!messages) {
        return null;
    }

    return (
        <div className="chat-wrapper">
            <h1>CHAT ROOM</h1>
            <div className="chat-container" ref={chat}>
                {messages.map(m => (
                    <div key={m.id}>
                        <img className="chat-photo" src={m.image_url} />
                        <h4>
                            {m.first_name} {m.last_name}
                        </h4>

                        <p> {m.message} </p>
                    </div>
                ))}
            </div>
            <textarea
                className="chat-textarea"
                placeholder="Add your chat message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
