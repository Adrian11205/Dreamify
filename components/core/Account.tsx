"use client";

import {
  ChevronDown,
  User,
} from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import SignOutAccount from "./SignOut";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";

function Account() {
  const { user } = useAuthStore();
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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition outline-none">
        <FaUserCircle size={30} className={isTransparent?"text-filter-white":"text-filter-black"} />
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-sm font-semibold text-accent-foreground">
            <p className={isTransparent?"text-filter-white":"text-filter-black"}>
              {user?.firstName} {user?.lastName}
            </p>
          </span>
        </div>
        <ChevronDown className={isTransparent?"w-4 h-4 text-background":"w-4 h-4 text-foreground"} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 bg-background border-0">
        <DropdownMenuLabel>{("myAccount")}</DropdownMenuLabel>

        <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
          <Link
            href={"/profile"}
            className="flex items-center gap-2 cursor-pointer">
            <User className="w-4 h-4" />
            {("profile")}
          </Link>
        </DropdownMenuItem>

        <SignOutAccount />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Account;
