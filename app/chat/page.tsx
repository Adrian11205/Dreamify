"use client"
import AuthGuard from "@/components/layout/AuthGuard";
import { messageUsers, messages, users } from "@/api/requests"
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";

function ChatListPage() {
    const { isAuth, user: currentUser } = useAuthStore()
    const [searchTerm, setSearchTerm] = useState("");
    const trimmedSearchTerm = searchTerm.trim();

    const {
        data: messageUsersData,
        isLoading: isLoadingMessageUsers,
        error: messageUsersError,
    } = useQuery({
        queryKey: ["message-user"],
        queryFn: () => messageUsers(),
        enabled: isAuth
    })

    const {
        data: incomingMessagesData,
        isLoading: isLoadingIncomingMessages,
        error: incomingMessagesError,
    } = useQuery({
        queryKey: ["incoming-message-requests", currentUser?.id],
        queryFn: () => {
            if (!currentUser?.id) {
                throw new Error("Utilizatorul autentificat nu este disponibil.");
            }
            return messages(currentUser.id);
        },
        enabled: isAuth && Boolean(currentUser?.id),
    })

    const {
        data: usersData = [],
        isLoading: isLoadingUsers,
        error: usersError,
    } = useQuery({
        queryKey: ["users", trimmedSearchTerm],
        queryFn: () =>
            users({
                params: trimmedSearchTerm.includes("@")
                    ? { email: trimmedSearchTerm }
                    : { name: trimmedSearchTerm },
            }),
        enabled: isAuth && trimmedSearchTerm.length > 0,
    })

    const messageUsersList = (messageUsersData ?? []).filter(
        (user) => typeof user.id === "string" && user.id.length > 0,
    );
    const usersList = (usersData ?? []).filter(
        (user) => typeof user.id === "string" && user.id.length > 0,
    );
    const incomingMessages = incomingMessagesData
        ? "results" in incomingMessagesData
            ? incomingMessagesData.results
            : [incomingMessagesData]
        : [];
    const incomingRequests = incomingMessages.filter(
        (message) =>
            message.to === currentUser?.id &&
            message.from !== currentUser?.id &&
            !message.accepted,
    );
    const conversationUserIds = new Set(messageUsersList.map((user) => user.id));
    const newChatUsers = usersList.filter(
        (user) =>
            user.id !== currentUser?.id &&
            !conversationUserIds.has(user.id),
    );

    return (
        <AuthGuard>
            <main className="flex min-h-[calc(100vh-10.1875rem)] justify-center bg-accent p-6 text-foreground">
                <div className="mt-15 grid h-fit w-full max-w-4xl gap-6 md:grid-cols-2">
                    <section className="rounded-2xl border border-border bg-background p-6 shadow-lg">
                        <h1 className="mb-4 text-xl font-semibold">Conversațiile mele</h1>

                        {isLoadingMessageUsers ? (
                            <p>Se încarcă conversațiile...</p>
                        ) : messageUsersError ? (
                            <p role="alert">Nu s-au putut încărca conversațiile.</p>
                        ) : messageUsersList.length === 0 ? (
                            <p>Nu ai conversații încă.</p>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                {isAuth && messageUsersList.map((user) => {
                                    const name = [user.firstName, user.lastName]
                                        .filter(Boolean)
                                        .join(" ");

                                    return (
                                        <li key={user.id}>
                                            <Link
                                                href={`/chat/${user.id}`}
                                                className="block rounded-lg border border-border p-3 hover:bg-accent"
                                            >
                                                {name || user.email}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <h2 className="mb-4 mt-8 text-xl font-semibold">Cereri de mesaje</h2>
                        {isLoadingIncomingMessages ? (
                            <p>Se încarcă cererile...</p>
                        ) : incomingMessagesError ? (
                            <p role="alert">Nu s-au putut încărca cererile de mesaje.</p>
                        ) : incomingRequests.length === 0 ? (
                            <p>Nu ai cereri de mesaje noi.</p>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                {incomingRequests.map((message) => {
                                    const name = [
                                        message.fromUser.firstName,
                                        message.fromUser.lastName,
                                    ]
                                        .filter(Boolean)
                                        .join(" ");

                                    return (
                                        <li key={message.id}>
                                            <Link
                                                href={`/chat/${message.from}`}
                                                className="block rounded-lg border border-border p-3 hover:bg-accent"
                                            >
                                                <span className="block font-medium">
                                                    Cerere de la {name || message.fromUser.email}
                                                </span>
                                                <span className="block text-sm text-muted-foreground">
                                                    {message.content}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </section>

                    <section className="rounded-2xl border border-border bg-background p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-semibold">Începe o conversație</h2>

                        <label className="mb-4 flex flex-col gap-2 text-sm">
                            Caută după nume sau email
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Introdu numele sau emailul"
                                className="h-11 rounded-lg border border-border bg-background px-3 text-foreground"
                            />
                        </label>

                        {!trimmedSearchTerm ? (
                            <p>Introdu numele sau emailul pentru a găsi un utilizator.</p>
                        ) : isLoadingUsers ? (
                            <p>Se încarcă utilizatorii...</p>
                        ) : usersError ? (
                            <p role="alert">Nu s-au putut încărca utilizatorii.</p>
                        ) : newChatUsers.length === 0 ? (
                            <p>Nu am găsit utilizatori pentru această căutare.</p>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                {isAuth && newChatUsers.map((user) => {
                                    const name = [user.firstName, user.lastName]
                                        .filter(Boolean)
                                        .join(" ");

                                    return (
                                        <li key={user.id}>
                                            <Link
                                                href={`/chat/${user.id}`}
                                                className="block rounded-lg border border-border p-3 hover:bg-accent"
                                            >
                                                {name || user.email}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </section>
                </div>
            </main>
        </AuthGuard>
    )
}
export default ChatListPage