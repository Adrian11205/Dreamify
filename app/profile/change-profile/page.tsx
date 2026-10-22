"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import AuthGuard from "@/components/layout/AuthGuard";
import SidebarProfile from "@/components/core/SidebarProfile";
import useProfileQueries from "@/components/hooks/useProfileQueries";
import { useMutation } from "@tanstack/react-query";
import { createCustomerPortalSession } from "@/api/requests";

const inputClassName =
    "h-12 w-full rounded-md border border-border bg-background px-4 text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20 read-only:bg-muted disabled:bg-muted";
const labelClassName = "flex flex-col gap-2 text-sm text-muted-foreground";

function ChangeProfile() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        errors,
        isEditing,
        handleSave,
        user,
        forgetPasswordMutation,
        replacePasswordMutation,
        updateProfileMutation,
    } = useProfileQueries();

    const image = user?.images?.find((i) => i.isMain);
    const imagePath = user?.mainImageUrl ?? image?.avatarUrl ?? image?.url;
    const imageSrc = imagePath && new URL(imagePath, "https://dev.dreamerz.net").href;
    const coverPath = user?.coverImage?.avatarUrl ?? user?.coverImage?.url;
    const coverSrc = coverPath && new URL(coverPath, "https://dev.dreamerz.net").href;

    const portalMutation = useMutation({
        mutationFn: () =>
            createCustomerPortalSession({
                returnUrl: `${window.location.origin}/profile`,
            }),
        onSuccess: (result) => {
            if (
                typeof result === "object" &&
                result !== null &&
                "url" in result &&
                typeof result.url === "string"
            ) {
                window.location.assign(result.url);
            } else {
                console.error("Răspunsul API nu conține un URL Stripe valid.", result);
            }
        },
        onError: (error) => {
            console.error("Nu s-a putut deschide portalul Stripe.", error);
        },
    });

    return (
        <AuthGuard>
            <div className="min-h-screen bg-accent">
                <SidebarProfile />
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        void handleSave();
                    }}
                >
                    <main className="min-h-[calc(100vh-10.1875rem)] py-8 pl-20 pr-4 sm:px-6 sm:pl-24">
                        <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-6">
                            <div className="relative h-40 w-full overflow-hidden rounded-md border border-border bg-muted shadow-lg sm:h-56">
                                {coverSrc && (
                                    <Image
                                        src={coverSrc}
                                        alt="Profile cover"
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                )}
                                <label className="absolute bottom-4 right-4 cursor-pointer rounded-md bg-primary px-4 py-2 text-primary-foreground">
                                    Încarcă o imagine
                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg"
                                        {...register("coverImage")}
                                        disabled={!isEditing}
                                        className="sr-only"
                                    />
                                </label>
                            </div>

                            <div className="grid items-start gap-6 lg:grid-cols-[minmax(250px,0.75fr)_minmax(0,2fr)]">
                                <section className="overflow-hidden rounded-md border border-border bg-background shadow-lg">
                                    <h2 className="border-b border-border bg-muted px-6 py-5 text-lg font-medium">
                                        Profile Picture
                                    </h2>
                                    <div className="flex flex-col items-center gap-4 p-6">
                                        {imageSrc ? (
                                            <Image
                                                src={imageSrc}
                                                alt="Profile picture"
                                                width={160}
                                                height={160}
                                                unoptimized
                                                className="size-40 rounded-full object-cover"
                                            />
                                        ) : (
                                            <FaUserCircle
                                                aria-label="Default profile picture"
                                                className="size-40 text-muted-foreground"
                                            />
                                        )}
                                        <p className="text-center text-sm text-muted-foreground">
                                            JPG or PNG, up to 5 MB
                                        </p>
                                        <label className="cursor-pointer rounded-md bg-primary px-4 py-2 text-primary-foreground">
                                            Încarcă o imagine
                                            <input
                                                type="file"
                                                accept="image/png,image/jpeg"
                                                {...register("mainImageUrl")}
                                                disabled={!isEditing}
                                                className="sr-only"
                                            />
                                        </label>
                                    </div>
                                </section>

                                <section className="overflow-hidden rounded-md border border-border bg-background shadow-lg">
                                    <h1 className="border-b border-border bg-muted px-6 py-5 text-lg font-medium">
                                        Account Details
                                    </h1>
                                    <div className="grid gap-5 p-6 sm:grid-cols-2">
                                        <label className={labelClassName}>
                                            First name
                                            <input
                                                type="text"
                                                {...register("firstName")}
                                                readOnly={!isEditing}
                                                className={inputClassName}
                                            />
                                        </label>
                                        {errors.firstName && (
                                            <p className="text-xs text-destructive sm:col-span-2">
                                                {errors.firstName.message}
                                            </p>
                                        )}

                                        <label className={labelClassName}>
                                            Last name
                                            <input
                                                type="text"
                                                {...register("lastName")}
                                                readOnly={!isEditing}
                                                className={inputClassName}
                                            />
                                        </label>
                                        {errors.lastName && (
                                            <p className="text-xs text-destructive">
                                                {errors.lastName.message}
                                            </p>
                                        )}

                                        <label className={`${labelClassName} sm:col-span-2`}>
                                            Description
                                            <input
                                                type="text"
                                                {...register("description")}
                                                readOnly={!isEditing}
                                                className={inputClassName}
                                            />
                                        </label>
                                        {errors.description && (
                                            <p className="text-xs text-destructive sm:col-span-2">
                                                {errors.description.message}
                                            </p>
                                        )}

                                        <label className={labelClassName}>
                                            Phone number
                                            <input
                                                type="tel"
                                                {...register("phoneNumber")}
                                                readOnly={!isEditing}
                                                className={inputClassName}
                                            />
                                        </label>
                                        {errors.phoneNumber && (
                                            <p className="text-xs text-destructive">
                                                {errors.phoneNumber.message}
                                            </p>
                                        )}

                                        <label className={labelClassName}>
                                            Birthday
                                            <input
                                                type="date"
                                                {...register("birthday")}
                                                readOnly={!isEditing}
                                                className={inputClassName}
                                            />
                                        </label>
                                        {errors.birthday && (
                                            <p className="text-xs text-destructive">
                                                {errors.birthday.message}
                                            </p>
                                        )}

                                        <label className={labelClassName}>
                                            Gender
                                            <select
                                                {...register("gender")}
                                                disabled={!isEditing}
                                                className={inputClassName}
                                            >
                                                <option value="">Select gender</option>
                                                <option value="MALE">Male</option>
                                                <option value="FEMALE">Female</option>
                                            </select>
                                        </label>
                                        {errors.gender && (
                                            <p className="text-xs text-destructive">
                                                {errors.gender.message}
                                            </p>
                                        )}

                                        <label className={labelClassName}>
                                            City
                                            <input
                                                type="text"
                                                {...register("city")}
                                                readOnly={!isEditing}
                                                className={inputClassName}
                                            />
                                        </label>
                                        {errors.city && (
                                            <p className="text-xs text-destructive">
                                                {errors.city.message}
                                            </p>
                                        )}

                                        <label className={labelClassName}>
                                            Country
                                            <input
                                                type="text"
                                                {...register("country")}
                                                readOnly={!isEditing}
                                                className={inputClassName}
                                            />
                                        </label>
                                        {errors.country && (
                                            <p className="text-xs text-destructive">
                                                {errors.country.message}
                                            </p>
                                        )}

                                        <label className={labelClassName}>
                                            Onboarding status
                                            <select
                                                {...register("onboardingStatus")}
                                                disabled={!isEditing}
                                                className={inputClassName}
                                            >
                                                <option value="">Select status</option>
                                                <option value="WELCOME">Welcome</option>
                                                <option value="PERSONAL_DATA">Personal data</option>
                                                <option value="USER_PROFILE">User profile</option>
                                                <option value="CREATE_DREAM">Create dream</option>
                                                <option value="SUBSCRIPTION_PLAN">Subscription plan</option>
                                                <option value="COMPLETED">Completed</option>
                                            </select>
                                        </label>
                                        {errors.onboardingStatus && (
                                            <p className="text-xs text-destructive">
                                                {errors.onboardingStatus.message}
                                            </p>
                                        )}

                                        <div className="flex flex-col gap-3 rounded-md border border-border bg-muted p-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                                            <div className={labelClassName}>
                                                <span>Monthly subscription status</span>
                                                <p className="text-foreground">
                                                    {user?.monthlySubscriptionStatus ?? "Fără abonament"}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => portalMutation.mutate()}
                                                disabled={portalMutation.isPending}
                                                className="h-11 rounded-md bg-primary px-5 text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {portalMutation.isPending
                                                    ? "Se deschide..."
                                                    : "Gestionează abonamentul"}
                                            </button>
                                        </div>
                                        {portalMutation.isError && (
                                            <p role="alert" className="text-sm text-destructive sm:col-span-2">
                                                Nu s-a putut deschide portalul abonamentului.
                                            </p>
                                        )}
                                        
                                        <label className={`${labelClassName} sm:col-span-2`}>
                                            Password
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    {...register("password")}
                                                    readOnly={!isEditing}
                                                    className={`${inputClassName} pr-11`}
                                                />
                                                <button
                                                    type="button"
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                    onClick={() => setShowPassword((previous) => !previous)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:text-foreground"
                                                >
                                                    {showPassword ? (
                                                        <Eye className="size-4" />
                                                    ) : (
                                                        <EyeOff className="size-4" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <span className="flex items-center gap-2 text-xs text-destructive">
                                                    <Info className="size-4" />
                                                    {errors.password.message}
                                                </span>
                                            )}
                                        </label>

                                        <label className={`${labelClassName} sm:col-span-2`}>
                                            Confirm password
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    {...register("confirmPassword")}
                                                    readOnly={!isEditing}
                                                    className={`${inputClassName} pr-11`}
                                                />
                                                <button
                                                    type="button"
                                                    aria-label={
                                                        showConfirmPassword
                                                            ? "Hide confirm password"
                                                            : "Show confirm password"
                                                    }
                                                    onClick={() =>
                                                        setShowConfirmPassword((previous) => !previous)
                                                    }
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:text-foreground"
                                                >
                                                    {showConfirmPassword ? (
                                                        <Eye className="size-4" />
                                                    ) : (
                                                        <EyeOff className="size-4" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.confirmPassword && (
                                                <span className="flex items-center gap-2 text-xs text-destructive">
                                                    <Info className="size-4" />
                                                    {errors.confirmPassword.message}
                                                </span>
                                            )}
                                        </label>

                                        <div className="flex items-center justify-between gap-4 sm:col-span-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (user?.email) {
                                                        forgetPasswordMutation.mutate({
                                                            email: user.email,
                                                        });
                                                    }
                                                }}
                                                disabled={forgetPasswordMutation.isPending}
                                                className="text-sm text-muted-foreground hover:text-foreground hover:underline disabled:opacity-50"
                                            >
                                                Forgot password?
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={
                                                    updateProfileMutation.isPending ||
                                                    replacePasswordMutation.isPending
                                                }
                                                className="h-12 rounded-md bg-primary px-6 text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                                            >
                                                {updateProfileMutation.isPending ||
                                                    replacePasswordMutation.isPending
                                                    ? "Saving..."
                                                    : isEditing
                                                        ? "Save Changes"
                                                        : "Change Profile"}
                                            </button>
                                        </div>

                                        {(updateProfileMutation.isError ||
                                            replacePasswordMutation.isError) && (
                                                <p
                                                    role="alert"
                                                    className="text-sm text-destructive sm:col-span-2"
                                                >
                                                    Failed to save changes. Please try again.
                                                </p>
                                            )}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </main>
                </form>
            </div>
        </AuthGuard>
    );
}

export default ChangeProfile;
