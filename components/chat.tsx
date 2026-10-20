"use client";

import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import getSocket from "@/app/chat/soket";

type ChatProps = {
    userId: string;
    username: string;
    setMessages: Dispatch<SetStateAction<Message[]>>;
    error: string; details: string
};

type Message = {
    id: string;
    from: string;
    to: string;
    content: string;
};

type MessageError = {
    error: string;
    details: string;
};

type NewsFeedShared = {
    postId: string;
    from: string;
    to: string[];
};

type ShareError = {
    error: string;
    details: string;
};

type AcceptRequest = {
    requestId: string;
    userId: string
}

type AcceptRequestError = {
    error: string;
    details: string;
}
type UpdateMessage = {
    id: string;
    content: string
}

type UpdateError = {
    error: string;
    details: string
}

type MessageDeleted = {
    id: string
}

type DeleteError = {
    error: string;
    details: string
}


function Chat({ userId, username, setMessages, }: ChatProps) {
    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        socket.emit("join-room", { userId });

        const onMessageCreated = (message: Message) => {
            setMessages((currentMessages) => [...currentMessages, message]);
        };

        const onMessageError = ({ error, details }: MessageError) => {
            console.error("Eroare la mesaj:", error, details);
        };

        socket.on("message-created", onMessageCreated);
        socket.on("message-error", onMessageError);

        return () => {
            socket.off("message-created", onMessageCreated);
            socket.off("message-error", onMessageError);
        };

    }, [userId, setMessages]);

    const socket = getSocket();
    if (!socket) return;

    socket.emit("user-typing", { username })
    socket.emit("user-stop-typinh", { username })


    const onNewsFeedShared = (data: NewsFeedShared) => {
        console.log("Postarea a fost distribuită", data);
    };

    const onShareError = (data: ShareError) => {
        console.error("Nu s-a putut distribui postarea:", data.error, data.details);
    };

    socket.on("news-feed-shared", onNewsFeedShared);
    socket.on("share-error", onShareError);

    socket.on("request-accepted", ((data: AcceptRequest) => {
        console.log("Cererea a fost acceptată", data);
    }))

    socket.on("request-error", ((data: AcceptRequestError) => {
        console.error("Eroare la acceptarea cererii:", data.error, data.details);
    }))

    const updateMessage = (data: UpdateMessage) => {
        socket.emit("update-message", data)
    }
    socket.on("message-updated", (data: UpdateMessage) => {
        console.log("Mesaj actualizat:", data);
    });

    socket.on("update-error", (data: UpdateError) => {
        console.error("Eroare la actualizare:", data.error, data.details);
    });

    socket.on("message-deleted", ({id}:MessageDeleted) => {
        setMessages((messages) => messages.filter((message) => message.id !== id));
    });

    socket.on(
        "delete-error",
        ({ error, details }: DeleteError) => {
            console.error("Nu s-a putut șterge mesajul:", error, details);
        },
    );


    return <div />;
}

export default Chat;

