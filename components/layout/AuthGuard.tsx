"use client"

import { useAuthStore } from "@/stores/useAuthStore";
import type { ReactNode } from "react";

type AuthProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthProps) {
  const { isAuth } = useAuthStore();

  if (!isAuth) {
    return (
      <div className="text-7xl text-red-500">
        Trebui sa fii autentificat ca sa accesezi aceasta pagina
      </div>
    );
  }
  return <>{children}</>;
}
