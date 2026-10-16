"use client"
import AuthGuard from "@/components/layout/AuthGuard";
import { messages, acceptMessageRequest } from "@/api/requests"
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { socket } from "@/app/chat/soket";
import Chat from "@/components/chat";

function ChatPage() {

    const params = useParams<{ id: string }>();
    const userId = params.id;

    const acceptMessageRequestMutation = useMutation({
        mutationFn: (userId: string) => acceptMessageRequest(userId),
        onSuccess: () => {
            console.log("Cererea a fost acceptată");
        },
        onError: (error) => {
            console.error(error);
        }
    })

    const { data, isLoading, error } = useQuery({
        queryKey: ["message", userId],
        queryFn: () => messages(userId),
        enabled: Boolean(userId),
    })


    if (isLoading) return <p>Loading Message </p>
    if (error) return <p>Error</p>
    if (!data) return null

    const messageList =
        "results" in data
            ? data.results
            : [data];

    return (
        <AuthGuard>
            <form className="min-h-screen">
                <div className="flex min-h-[calc(100vh-10.1875rem)] items-center justify-center bg-accent px-4 py-10">
                    <div className="w-full max-w-md">

                        <button
                            type="button"
                            onClick={() => acceptMessageRequestMutation.mutate(userId)}
                        >
                            Acceptă cererea
                        </button>
                        {messageList
                            .filter(
                                (message) => message.from === userId || message.to === userId
                            )
                            .map((message) => (
                                <div key={message.id}>{message.content}</div>
                            ))}
                    </div>
                    <Chat/>
                </div>
            </form>
        </AuthGuard>
    )
}
export default ChatPage