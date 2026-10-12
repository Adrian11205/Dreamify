"use client"
import AuthGuard from "@/components/layout/AuthGuard";
import { messageUsers } from "@/api/requests"
import { useQuery } from "@tanstack/react-query";
import type { UserDto } from "@/api/types"
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
function ChatListPage() {
    const { isAuth } = useAuthStore()

    const { data, isLoading, error } = useQuery({
        queryKey: ["message-user"],
        queryFn: () => messageUsers(),
        enabled: isAuth
    })

    if (isLoading) return <main className="min-h-screen bg-background p-6 text-foreground">Loading Message Users</main>;
    if (error) return <main className="min-h-screen bg-background p-6 text-foreground">Error loading users</main>;

    const users: UserDto[] | undefined = data
    if (!users) return <main className="min-h-screen bg-background p-6 text-foreground">Nu există utilizatori.</main>;

    return (
        <AuthGuard>
            <form className="bg-accent text-foreground">
                <main className="flex min-h-[calc(100vh-10.1875rem)] flex-1 items-center justify-center p-6">
                    <div className="flex w-full max-w-md flex-col gap-4">
                        {users.map((user) => (
                            <Link href={`/chat/${user.id}`} key={user.id}>
                                {user.firstName} {user.lastName}
                            </Link>
                        ))}

                        <div className="h-fit w-full rounded-2xl border border-border bg-background p-6 shadow-lg">
                            {users.length === 0 && (
                                <p>Nu există utilizatori disponibili pentru chat.</p>
                            )}
                            <p>Utilizatori găsiți: {users.length}</p>

                        </div>
                    </div>
                </main>
            </form>
        </AuthGuard>
    )
}
export default ChatListPage