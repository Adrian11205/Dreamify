"use client";

import {
  ChevronDown,
  User,
  Send
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
import Image from "next/image";

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
  const image = user?.images?.find((i) => i.isMain);
  const imagePath = user?.mainImageUrl ?? image?.avatarUrl ?? image?.url;
  const imageSrc = imagePath && new URL(imagePath, "https://dev.dreamerz.net").href;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition outline-none">
        <div className="flex flex-col items-center ">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Profile picture"
              width={30}
              height={30}
              unoptimized
              className="size-9 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle
              aria-label="Default profile picture"
              className="size-9 text-muted-foreground"
            />
          )}

        </div>        <div className="hidden sm:flex flex-col text-left">
          <span className="text-sm font-semibold text-accent-foreground">
            <p className={isTransparent ? "text-filter-white" : "text-filter-black"}>
              {user?.firstName} {user?.lastName}
            </p>
          </span>
        </div>
        <ChevronDown className={isTransparent ? "w-4 h-4 text-background" : "w-4 h-4 text-foreground"} />
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

        <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
          <Link
            href={"/chat"}
            className="flex items-center gap-2 cursor-pointer">
            <Send className="w-4 h-4" />
            {("Chat List")}
          </Link>
        </DropdownMenuItem>

        <SignOutAccount />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Account;
