"use client";

import { useEffect } from "react";
import getSocket from "@/app/chat/soket";

type ChatProps = {
    userId: string;
    username:string
};

function Chat({ userId,username }: ChatProps) {
    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        socket.emit("join-room", { userId });

        const onMessageCreated = (message: Message) => {
            // gestionează mesajul primit
        };

        socket.on("message-created", onMessageCreated);

        return () => {
            socket.off("message-created", onMessageCreated);
        };
    }, [userId]);

    const socket = getSocket();
    if (!socket) return;

    socket.emit("user-typing",{username})

    return <div />;
}

export default Chat;