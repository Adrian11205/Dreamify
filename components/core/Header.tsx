"use client"
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Account from "@/components/core/Account"
function Header() {
    const { isAuth } = useAuthStore();
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isTransparent = isHomePage && !scrolled;

    return (
        <header className={isTransparent ? "fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-end bg-transparent px-5 transition-colors" : "fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-end bg-filter-white px-5  transition-colors"}>
            <div className="flex items-center gap-3">

                {isAuth ? (
                    <>
                        <Link
                            href={"/"}
                            className={isTransparent ? "absolute left-5 top-1/2 flex w-fit -translate-y-1/2 flex-col items-center justify-center text-[9px] font-semibold tracking-[0.42em] text-filter-white" : "absolute left-5 top-1/2 flex w-fit -translate-y-1/2 flex-col items-center justify-center text-[9px] font-semibold tracking-[0.42em] text-filter-black"}>
                            <span className={isTransparent ? "mb-1 block h-px w-11 -rotate-6 bg-filter-white" : "mb-1 block h-px w-11 -rotate-6 bg-filter-black"} />
                            DREAMERZ
                        </Link>
                        <Account />
                    </>
                ) : (
                    <>
                        <Link
                            href={"/"}
                            className={isTransparent ? "absolute left-5 top-1/2 flex w-fit -translate-y-1/2 flex-col items-center justify-center text-[9px] font-semibold tracking-[0.42em] text-filter-white" : "absolute left-5 top-1/2 flex w-fit -translate-y-1/2 flex-col items-center justify-center text-[9px] font-semibold tracking-[0.42em] text-filter-black"}>
                            <span className={isTransparent ? "mb-1 block h-px w-11 -rotate-6 bg-filter-white" : "mb-1 block h-px w-11 -rotate-6 bg-filter-black"} />
                            DREAMERZ
                        </Link>

                        <div className={isTransparent ? "rounded-xl border-2 border-filter-white" : "rounded-xl border-2 border-foreground/30"}>
                            <Link href={"/login"}
                                className="flex h-11 w-37 cursor-pointer items-center justify-center rounded-[10px] px-4 hover:bg-linear-gradient"
                            >
                                <span className={isTransparent ? "text-filter-white" : "text-filter-black"}>
                                    Log In
                                </span>
                            </Link>
                        </div>

                        <div className="rounded-xl border-2 border-linear-gradient">
                            <Link href="/register"
                                className="flex h-11 w-37 cursor-pointer items-center justify-center rounded-[10px] bg-linear-gradient px-4 text-foreground hover:bg-linear-gradient"
                            >
                                Sign In
                            </Link>

                        </div>
                    </>
                )}

            </div>
        </header>
    );
}

export default Header