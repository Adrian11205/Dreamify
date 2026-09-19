"use client"
import Link from "next/link";
import { useState } from "react";
import { login } from "@/api/requests";
import { toast } from "sonner";
import { Eye, EyeOff, Info } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { setTokens } = useAuthStore();

    const schema = z.object({
        email: z.string().email("Email is invalid"),
        password: z
            .string()
            .min(6, ("Password must be at least 6 characters"))
            .max(14, ("Password must be at most  16 characters"))
    })

    type Form = z.infer<typeof schema>

    const logInMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            toast.success("Logged in successfully");
            setTokens(data.accessToken, data.refreshToken);
        },
        onError: (error) => {
            toast.error(error?.message || "Eroare la autentificare");
        },
    });

    const { register, handleSubmit, formState: { errors } } = useForm<Form>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: Form) => {
        const payload = {
            email: data.email,
            password: data.password
        }
        logInMutation.mutate(payload)
    }

    return (
        <main className="min-h-screen bg-auth px-4 pb-20 pt-28 text-foreground">
            <section className="mx-auto w-full max-w-125 rounded-xl bg-card px-7 py-9 shadow-auth-card sm:px-16 sm:py-12">
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-5 flex w-fit flex-col items-center text-[9px] font-semibold tracking-[0.42em]">
                        <span className="mb-1 block h-px w-11 -rotate-6 bg-foreground" />
                        DREAMERZ
                    </div>
                    <h1 className="font-serif text-4xl italic tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Log in and continue fulfilling your dream!
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium"
                        >E-mail address:
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="h-11 w-full rounded-lg border border-border px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                        />
                        {errors.email && (
                            <span className="flex items-center gap-2 text-xs text-destructive">
                                <Info />
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password:
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className="h-11 w-full rounded-lg border border-border px-3 pr-11 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.password && (
                            <span
                                className="flex items-center gap-2 text-xs text-destructive">
                                <Info />
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={logInMutation.isPending}
                        className="h-11 w-full rounded-lg bg-linear-gradient text-sm font-medium text-auth-button-foreground transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {logInMutation.isPending ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                    Don{"'"}t have an account?{" "}
                    <Link href="/register" className="font-medium text-auth-link hover:underline">
                        Sign Up
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default Login