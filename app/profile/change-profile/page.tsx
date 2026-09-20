"use client"
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import AuthGuard from "@/components/layout/AuthGuard";
import { Eye, EyeOff, Info } from "lucide-react";
import useProfileQueries from "@/components/hooks/useProfileQueries"
import SidebarProfile from"@/components/core/SidebarProfile"

function ChangeProfile() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        errors,
        handleSubmit,
        isEditing,
        handleSave,
        onSubmit,
        user,
        forgetPasswordMutation,
        replacePasswordMutation,
        updateProfileMutation,
    } = useProfileQueries()

    return (
        <AuthGuard>
            <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen">
                <div className="flex min-h-screen items-center justify-center bg-accent px-4 py-10">
                    <div className="w-full max-w-xl">
                        <div className="h-fit w-full rounded-2xl border border-border bg-background p-6 shadow-lg">

                            <SidebarProfile/>
                            <div className="flex flex-col items-center mb-6">
                                <FaUserCircle size={80} />
                                <h1 className="mt-2 text-lg font-semibold">{("Change Profile")}</h1>
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-4">{("First Name")}</span>
                                <input
                                    type="text"
                                    {...register("firstName")}
                                    readOnly={!isEditing}

                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>

                            {errors.firstName && (
                                <p className="text-destructive text-xs">{errors.firstName.message}</p>
                            )}

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-3">{("Last Name")}</span>
                                <input
                                    type="text"
                                    {...register("lastName")}
                                    readOnly={!isEditing}

                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>

                            {errors.lastName && (
                                <p className="text-destructive text-xs">{errors.lastName.message}</p>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm text-chart-3">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        readOnly={!isEditing}
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

                            <div className="mt-4 space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm text-chart-3">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...register("confirmPassword")}
                                        readOnly={!isEditing}
                                        className="h-11 w-full rounded-lg border border-border px-3 pr-11 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                                    />
                                    <button
                                        type="button"
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
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

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (user?.email) {
                                            forgetPasswordMutation.mutate({ email: user.email });
                                        }
                                    }}
                                    className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={updateProfileMutation.isPending || replacePasswordMutation.isPending}
                                    className="flex items-center justify-center gap-3 h-12 w-full max-w-65 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 "                            >
                                    {updateProfileMutation.isPending || replacePasswordMutation.isPending ? ("Saving") : isEditing ? ("Save Changes") : ("Change Profile")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AuthGuard>
    );
}

export default ChangeProfile