"use client";

import Link from "next/link";
import {
    UserRoundPen,
    User,
    Sparkles
} from "lucide-react";



const primaryLinks = [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Change Profile", href: "/profile/change-profile", icon: UserRoundPen },
    { label: "Dreams", href: "/profile/dreams", icon: Sparkles },
];



interface SidebarProps {
    menuOnly?: boolean;
}

function Sidebar({ menuOnly = false }: SidebarProps) {
    return (
        <aside
            className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] overscroll-contain px-3 py-3 text-foreground ${menuOnly ? "overflow-y-auto" : "overflow-hidden"} ${menuOnly ? "w-16 bg-transparent" : "w-20 bg-background"}`} >
            <nav
                aria-label="Compact navigation"
                className={menuOnly ? "hidden" : "flex h-full flex-col items-center  gap-3"}
            >
                {[...primaryLinks].map(({ label, href, icon: Icon }) => (
                    <Link
                        key={label}
                        href={href}
                        title={label}
                        className="flex w-full flex-col items-center justify-center gap-2 rounded-xl px-2 py-3 text-[11px] hover:bg-accent"
                    >
                        <Icon className="size-5" />
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar