"use client"
import AuthGuard from "@/components/layout/AuthGuard";
import { messageUsers, users } from "@/api/requests"
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";

function ChatListPage() {
    const { isAuth } = useAuthStore()

    const { data: messageUsersData, isLoading: isLoadingMessageUsers, error: errorMessageUsers } = useQuery({
        queryKey: ["message-user"],
        queryFn: () => messageUsers(),
        enabled: isAuth
    })

    const { data: dataUsers, isLoading: isLoadingUsers, error: errorUsers } = useQuery({
        queryKey: ["users"],
        queryFn: () => users(),
        enabled: isAuth
    })

    console.log("Users",dataUsers);
    console.log("Auth",isAuth);

    if (isLoadingMessageUsers) return <main className="min-h-screen bg-background p-6 text-foreground">Loading Message Users</main>;
    if (errorMessageUsers) return <main className="min-h-screen bg-background p-6 text-foreground">Error loading users</main>;

    if (isLoadingUsers) return <main className="min-h-screen bg-background p-6 text-foreground">Loading  Users</main>;
    if (errorUsers) return <main className="min-h-screen bg-background p-6 text-foreground">Error  users</main>;

    const messageUsersList = messageUsersData ?? [];
    const allUsers = dataUsers ?? [];


    return (
        <AuthGuard>
            <form className="bg-accent text-foreground">
                <main className="flex min-h-[calc(100vh-10.1875rem)] flex-1 items-center justify-center p-6">
                    <div className="flex w-full max-w-md flex-col gap-4">
                        {allUsers.map((user) => (
                            <Link href={`/chat/${user.id}`} key={user.id}>
                                {user.firstName} {user.lastName}
                            </Link>
                        ))}

                        <div className="h-fit w-full rounded-2xl border border-border bg-background p-6 shadow-lg">
                            {messageUsersList.length === 0 && (
                                <p>Nu există utilizatori disponibili pentru chat.</p>
                            )}
                            <p>Utilizatori găsiți: {messageUsersList.length}</p>

                        </div>
                    </div>
                </main>
            </form>
        </AuthGuard>
    )
}
export default ChatListPage