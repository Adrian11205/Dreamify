"use client"
import AuthGuard from "@/components/layout/AuthGuard";
import { messages as messagesRequests, acceptMessageRequest } from "@/api/requests"
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import Chat, { type Message } from "@/components/chat";
import { useAuthStore } from "@/stores/useAuthStore";

function ChatPage() {
    const [liveMessages, setMessages] = useState<Message[]>([])
    const currentUser = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();
    const params = useParams<{ id: string }>();
    const userId = params.id;

    const acceptMessageRequestMutation = useMutation({
        mutationFn: (userId: string) => acceptMessageRequest(userId),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["message", userId] });
            void queryClient.invalidateQueries({
                queryKey: ["message", currentUser?.id],
            });
            void queryClient.invalidateQueries({
                queryKey: ["incoming-message-requests", currentUser?.id],
            });
            void queryClient.invalidateQueries({ queryKey: ["message-user"] });
        },
        onError: (error) => {
            console.error(error);
        }
    })

    const { data, isLoading, error } = useQuery({
        queryKey: ["message", userId],
        queryFn: () => messagesRequests(userId),
        enabled: Boolean(userId),
    })

    const { data: currentUserMessagesData } = useQuery({
        queryKey: ["message", currentUser?.id],
        queryFn: () => {
            if (!currentUser?.id) {
                throw new Error("Utilizatorul autentificat nu este disponibil.");
            }
            return messagesRequests(currentUser.id);
        },
        enabled: Boolean(currentUser?.id),
    });

    const partnerMessages =
        data && "results" in data ? data.results : data ? [data] : [];
    const currentUserMessages =
        currentUserMessagesData && "results" in currentUserMessagesData
            ? currentUserMessagesData.results
            : currentUserMessagesData
                ? [currentUserMessagesData]
                : [];
    const messageList = [
        ...new Map(
            [...partnerMessages, ...currentUserMessages].map((message) => [
                message.id,
                message,
            ]),
        ).values(),
    ];
    if (isLoading) return <p>Loading Message </p>
    if (error) return <p>Error</p>

    const hasIncomingRequest = messageList.some(
        (message) =>
            message.from === userId &&
            message.to === currentUser?.id &&
            !message.accepted,
    );
    const visibleMessages = [
        ...messageList,
        ...liveMessages.filter(
            (liveMessage) =>
                !messageList.some((message) => message.id === liveMessage.id),
        ),
    ];

    return (
        <AuthGuard>
            <div className="min-h-screen">
                <div className=" mt-10 flex min-h-[calc(100vh-10.1875rem)] justify-center bg-accent px-4 py-10">
                    <div className="flex w-full max-w-2xl flex-col gap-4">
                        {hasIncomingRequest && (
                            <button
                                type="button"
                                disabled={acceptMessageRequestMutation.isPending}
                                onClick={() => acceptMessageRequestMutation.mutate(userId)}
                            >
                                {acceptMessageRequestMutation.isPending
                                    ? "Se acceptă..."
                                    : "Acceptă cererea"}
                            </button>
                        )}
                        <div className="flex min-h-80 flex-col gap-3 rounded-2xl border border-border bg-background p-4 shadow-sm">
                            {visibleMessages.length === 0 ? (
                                <p className="m-auto text-sm text-muted-foreground">
                                    Nu există mesaje încă. Trimite primul mesaj.
                                </p>
                            ) : (
                                visibleMessages
                                    .filter(
                                        (message) =>
                                            (message.from === userId && message.to === currentUser?.id) ||
                                            (message.from === currentUser?.id && message.to === userId),
                                    )
                                    .map((message) => {
                                        const isSentByCurrentUser = message.from === currentUser?.id;

                                        return (
                                            <div
                                                key={message.id}
                                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                                    isSentByCurrentUser
                                                        ? "self-end bg-primary text-primary-foreground"
                                                        : "self-start bg-accent text-foreground"
                                                }`}
                                            >
                                                <p className="wrap-break-word">{message.content}</p>
                                            </div>
                                        );
                                    })
                            )}
                        </div>
                        {currentUser?.id && (
                            <Chat
                                userId={userId}
                                currentUserId={currentUser.id}
                                setMessages={setMessages}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthGuard>
    )
}
export default ChatPage