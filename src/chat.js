import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export function Chat() {
    const messages = useSelector(state => state.messages);
    const chat = useRef();

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
    console.log(messages);

    return (
        <div className="chat-wrapper">
            <h1>CHAT ROOM</h1>
            <div className="chat-container" ref={chat}>
                {messages.map(m => (
                    <div className="chat-flex" key={m.id}>
                        <img className="chat-photo" src={m.image_url} />
                        <div className="chat-user">
                            <h3>
                                {m.first_name} {m.last_name}
                            </h3>
                            <p className="time"> {m.created_at} </p>
                            <p> {m.message} </p>
                        </div>
                    </div>
                ))}
            </div>
            <textarea
                className="chat-textarea"
                placeholder="Chat with us, here..."
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
