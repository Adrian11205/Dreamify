"use client"
import { useState } from "react";
import { register as registerUser } from "@/api/requests";
import { toast } from "sonner";
import { CheckCircle2, Eye, EyeOff, Info } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";


function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { setTokens } = useAuthStore();

    const schema = z.object({
        email: z.string().email(("Email is invalid")),
        password: z
            .string()
            .min(8, ("Password must be between 8 and 16 characters."))
            .max(16, ("Password must be between 8 and 16 characters."))
            .refine((value) => /[A-Z]/.test(value) && /[a-z]/.test(value), {
                message: ("Password must include uppercase and lowercase letters."),
            })
            .refine((value) => /\d/.test(value), {
                message: ("Password must include one number."),
            })
            .refine((value) => /[{};:=<>_+\-^#$@!%*?&]/.test(value), {
                message: ("Password must include one symbol."),
            }),
        confirmPassword: z.string(),
    }).refine((values) => values.password === values.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match.",
    })


    type Form = z.infer<typeof schema>

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            setTokens(data.accessToken, data.refreshToken);
            toast.success("Register in successfully");
        },
        onError: (error) => {
            toast.error(error?.message || "Eroare la autentificare");
        },
    });

    const { register, handleSubmit, control, formState: { errors } } = useForm<Form>({
        resolver: zodResolver(schema)
    })

    const passwordValue = useWatch({ control, name: "password", defaultValue: "" });
    const confirmPasswordValue = useWatch({ control, name: "confirmPassword", defaultValue: "" });
    const hasMinimumLength = passwordValue.length >= 8;
    const hasUppercase = /[A-Z]/.test(passwordValue);
    const hasLowercase = /[a-z]/.test(passwordValue);
    const hasSpecialSymbol = /[{};:=<>_+\-^#$@!%*?&]/.test(passwordValue);
    const passwordsMatch = passwordValue.length > 0
        && confirmPasswordValue.length > 0
        && passwordValue === confirmPasswordValue;

    const onSubmit = (data: Form) => {
        registerMutation.mutate({
            email: data.email,
            password: data.password,
        })
    }

    return (
        <main className="min-h-screen bg-auth px-4 pb-20 pt-28 text-foreground">
            <section className="mx-auto w-full max-w-125 rounded-xl bg-card px-7 py-9 shadow-auth-card sm:px-16 sm:py-12">
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-5 flex w-fit flex-col items-center text-[9px] font-semibold tracking-[0.42em]">
                        <span className="mb-1 block h-px w-11 -rotate-6 bg-foreground" />
                        DREAMERZ
                    </div>
                    <h1 className="font-serif text-4xl italic tracking-tight"
                    >Welcome Back
                    </h1>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Log in and continue fulfilling your dream!
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            E-mail address:
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="h-11 w-full rounded-lg border border-border px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                        />
                        {errors.email && (
                            <span className="flex items-center gap-2 text-xs text-destructive">
                                <Info className="h-4 w-4" />
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
                                <Info className="h-4 w-4" />
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="confirm-password" className="text-sm font-medium">
                            Repeat Password:
                        </label>
                        <div className="relative">
                            <input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                className="h-11 w-full rounded-lg border border-border px-3 pr-11 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                            />
                            <button
                                type="button"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:text-foreground"
                            >
                                {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <span
                                className="flex items-center gap-2 text-xs text-destructive">
                                <Info className="h-4 w-4" />
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">

                        <div className={`flex items-center gap-2 text-xs ${hasMinimumLength && passwordsMatch ? "text-success" : "text-muted-foreground"}`}>
                            {hasMinimumLength && passwordsMatch ? <CheckCircle2 className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                            Minimum 8 characters
                        </div>
                        <div className={`flex items-center gap-2 text-xs ${hasUppercase && hasLowercase && passwordsMatch ? "text-success" : "text-muted-foreground"}`}>
                            {hasUppercase && hasLowercase && passwordsMatch ? <CheckCircle2 className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                            Uppercase and lowercase letters
                        </div>
                        <div className={`flex items-center gap-2 text-xs ${hasSpecialSymbol && passwordsMatch ? "text-success" : "text-muted-foreground"}`}>
                            {hasSpecialSymbol && passwordsMatch ? <CheckCircle2 className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                            At least one special symbol {"{};:=<>_+-^#$@!%*?&"}
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="h-11 w-full rounded-lg bg-linear-gradient text-sm font-medium text-auth-button-foreground transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {registerMutation.isPending ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-auth-link hover:underline">
                        Log In
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default Register