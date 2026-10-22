"use client";

import { useEffect } from "react";
import { useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import getSocket from "@/app/chat/soket";

type ChatProps = {
    userId: string;
    currentUserId: string;
    setMessages: Dispatch<SetStateAction<Message[]>>;
};

export type Message = {
    id: string;
    from: string;
    to: string;
    content: string;
    accepted?: boolean;
};

type MessageError = {
    error: string;
    details: string;
};

type MessageRequestSent = {
    requestId: string;
    from: string;
    to: string;
};

function Chat({ userId, currentUserId, setMessages }: ChatProps) {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const pendingContent = useRef("");

    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        socket.emit("join-room", { userId: currentUserId });

        const onMessageCreated = (message: Message) => {
            const belongsToConversation =
                (message.from === currentUserId && message.to === userId) ||
                (message.from === userId && message.to === currentUserId);
            if (!belongsToConversation) return;

            setMessages((currentMessages) =>
                currentMessages.some((currentMessage) => currentMessage.id === message.id)
                    ? currentMessages
                    : [...currentMessages, message],
            );
        };

        const onMessageError = ({ error, details }: MessageError) => {
            setError(`${error}: ${details}`);
        };

        const onRequestSent = (request: MessageRequestSent) => {
            if (request.from !== currentUserId || request.to !== userId) return;

            setNotice("Cererea de conversație a fost trimisă.");
            const pendingMessage: Message = {
                id: `pending-${request.requestId}`,
                from: request.from,
                to: request.to,
                content: pendingContent.current,
                accepted: false,
            };
            setMessages((currentMessages) =>
                currentMessages.some((message) => message.id === pendingMessage.id)
                    ? currentMessages
                    : [...currentMessages, pendingMessage],
            );
            pendingContent.current = "";
        };

        socket.on("message-created", onMessageCreated);
        socket.on("message-error", onMessageError);
        socket.on("request-sent", onRequestSent);

        return () => {
            socket.off("message-created", onMessageCreated);
            socket.off("message-error", onMessageError);
            socket.off("request-sent", onRequestSent);
        };
    }, [currentUserId, setMessages, userId]);

    const sendMessage = () => {
        const trimmedContent = content.trim();
        const socket = getSocket();

        if (!trimmedContent || !socket) return;

        setError("");
        setNotice("");
        pendingContent.current = trimmedContent;
        socket.emit("create-message", {
            from: currentUserId,
            to: userId,
            content: trimmedContent,
        });
        setContent("");
    };

    const handleMessageKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex w-full max-w-md flex-col gap-3">
            <label htmlFor="chat-message" className="sr-only">Mesaj</label>
            <div className="flex gap-2">
                <input
                    id="chat-message"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    onKeyDown={handleMessageKeyDown}
                    placeholder="Scrie un mesaj..."
                    className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2"
                />
                <button
                    type="button"
                    onClick={sendMessage}
                    disabled={!content.trim()}
                    className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
                >
                    Trimite
                </button>
            </div>
            {notice && <p role="status">{notice}</p>}
            {error && <p role="alert">{error}</p>}
        </div>
    );
}

export default Chat;
