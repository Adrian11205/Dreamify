"use client";

import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import AuthGuard from "@/components/layout/AuthGuard";
import SidebarProfile from "@/components/core/SidebarProfile";
import useProfileQueries from "@/components/hooks/useProfileQueries";

function Profile() {
    const { register, user } = useProfileQueries();

    const image = user?.images?.find((i) => i.isMain);
    const imagePath = user?.mainImageUrl ?? image?.avatarUrl ?? image?.url;
    const imageSrc = imagePath && new URL(imagePath, "https://dev.dreamerz.net").href;
    const coverPath = user?.coverImage?.avatarUrl ?? user?.coverImage?.url;
    const coverSrc = coverPath && new URL(coverPath, "https://dev.dreamerz.net").href;

    return (
        <AuthGuard>
            <div className="min-h-screen bg-accent">
                <SidebarProfile />
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
                                    Your profile picture
                                </p>
                            </div>
                        </section>

                        <section className="overflow-hidden rounded-md border border-border bg-background shadow-lg">
                            <h1 className="border-b border-border bg-muted px-6 py-5 text-lg font-medium">
                                Account Details
                            </h1>
                            <div className="grid gap-5 p-6 sm:grid-cols-2">
                                <label className="flex flex-col gap-2 text-sm text-muted-foreground sm:col-span-2">
                                    First name
                                    <input
                                        type="text"
                                        {...register("firstName")}
                                        readOnly
                                        className="h-12 w-full rounded-md border border-border bg-background px-4 text-foreground"
                                    />
                                </label>

                                <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    Last name
                                    <input
                                        type="text"
                                        {...register("lastName")}
                                        readOnly
                                        className="h-12 w-full rounded-md border border-border bg-background px-4 text-foreground"
                                    />
                                </label>

                                <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    Email address
                                    <input
                                        type="email"
                                        {...register("email")}
                                        readOnly
                                        className="h-12 w-full rounded-md border border-border bg-background px-4 text-foreground"
                                    />
                                </label>

                                <label className="flex flex-col gap-2 text-sm text-muted-foreground sm:col-span-2">
                                    Description
                                    <input
                                        type="text"
                                        {...register("description")}
                                        readOnly
                                        className="h-12 w-full rounded-md border border-border bg-background px-4 text-foreground"
                                    />
                                </label>

                                <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    Phone number
                                    <input
                                        type="text"
                                        {...register("phoneNumber")}
                                        readOnly
                                        className="h-12 w-full rounded-md border border-border bg-background px-4 text-foreground"
                                    />
                                </label>

                                <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    Birthday
                                    <input
                                        type="date"
                                        {...register("birthday")}
                                        readOnly
                                        className="h-12 w-full rounded-md border border-border bg-background px-4 text-foreground"
                                    />
                                </label>

                                <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    Gender
                                    <input
                                        type="text"
                                        {...register("gender")}
                                        readOnly
                                        className="h-12 w-full rounded-md border border-border bg-background px-4 text-foreground"
                                    />
                                </label>

                                <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    City
                                    <input
                                        type="text"
                                        {...register("city")}
                                        readOnly
                                        className="h-12 w-full rounded-md border border-border bg-background px-4 text-foreground"
                                    />
                                </label>

                                <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    Country
                                    <input
                                        type="text"
                                        {...register("country")}
                                        readOnly
                                        className="h-12 w-full rounded-md border border-border bg-background px-4 text-foreground"
                                    />
                                </label>

                                <label className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    Onboarding status
                                    <input
                                        type="text"
                                        {...register("onboardingStatus")}
                                        readOnly
                                        className="h-12 w-full rounded-md border border-border bg-background px-4 text-foreground"
                                    />
                                </label>
                            </div>
                        </section>
                        </div>
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}

export default Profile;
