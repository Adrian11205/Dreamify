import { create } from "zustand"
import { toast } from "sonner";
import { persist, createJSONStorage } from "zustand/middleware";
import { login, register } from "@/api/requests";
import { ProfileDto } from "@/api/types"

interface AuthUser {
    user: ProfileDto | null;
    setUser: (user: ProfileDto) => void;
    isAuth: boolean;
    logout: () => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    login: (email: string, password: string) => void;
    register: (email: string, password: string) => void
}

export const useAuthStore = create<AuthUser>()(
    persist((set, get) => ({

        user: null,

        setUser: (user) => {
            return set(() => ({ user }))
        },

        isAuth: false,

        setTokens: (accessToken, refreshToken) => {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            set(() => ({
                isAuth: true,
                user: null,
            }));
        },

        logout: () => {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")

            return set(() => ({
                user: null,
                isAuth: false
            }))
        },

        login: async (email: string, password: string) => {
            try {
                const tokens = await login({ email, password });

                localStorage.setItem("accessToken", tokens.accessToken);
                localStorage.setItem("refreshToken", tokens.refreshToken);

                set(() => ({
                    isAuth: true,
                    user: null,
                }));
            } catch (error) {
                toast.error("Nu putem face login: " + String(error));
                get().logout();
            }
        },

        register: async (email: string, password: string) => {
            try {
                const tokens = await register({ email, password });

                localStorage.setItem("accessToken", tokens.accessToken);
                localStorage.setItem("refreshToken", tokens.refreshToken);

                set(() => ({
                    isAuth: true,
                    user: null,
                }));
            } catch (error) {
                toast.error("Nu putem face register: " + String(error));
                get().logout();
            }
        }

    }),
        {
            name: "auth-info",
            storage: createJSONStorage(() => localStorage)
        }
    )
)