"use client"
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import AuthGuard from "@/components/layout/AuthGuard";
import { Eye, EyeOff, Info } from "lucide-react";
import useProfileQueries from "@/components/hooks/useProfileQueries"

function Profile() {
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

        dreamsData,
        dreamsLoading,
        dreamsError,

        dreamDonationsData,
        dreamDonationsLoading,
        dreamDonationsError,

        commentsData,
        commentsLoading,
        commentsError,

        wingDonationData,
        wingDonationLoading,
        wingDonationError,

        wingDonationAllData,
        wingDonationAllLoading,
        wingDonationAllError,

        donationsData,
        donationsLoading,
        donationsError,

        donationsAllData,
        donationsAllLoading,
        donationsAllError,
    } = useProfileQueries()

    const queryErrors = [
        dreamsError,
        dreamDonationsError,
        commentsError,
        wingDonationError,
        wingDonationAllError,
        donationsError,
        donationsAllError,
    ].filter((error): error is Error => error instanceof Error);

    if (queryErrors.length > 0) {
        return (
            <div>
                {queryErrors.map((error, index) => (
                    <p key={index}>{error.message}</p>
                ))}
            </div>
        );
    }

    const loadingQueries = [
        { loading: dreamsLoading, message: "Loading dreams..." },
        { loading: dreamDonationsLoading, message: "Loading dream donations..." },
        { loading: commentsLoading, message: "Loading comments..." },
        { loading: wingDonationLoading, message: "Loading wing donations..." },
        { loading: wingDonationAllLoading, message: "Loading all wing donations..." },
        { loading: donationsAllLoading, message: "Loading all donations..." },
        { loading: donationsLoading, message: "Loading donations..." },
    ].filter((query) => query.loading)

    if (loadingQueries.length > 0) {
        return (
            <div>
                {loadingQueries.map((query) => (
                    <p key={query.message}>{query.message}</p>
                ))}
            </div>
        );
    }

    return (
        <AuthGuard>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex  items-start justify-center bg-accent px-4 pb-24 pt-28">
                    <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
                        <div className="h-fit w-full rounded-2xl border border-border bg-background p-6 shadow-lg">

                            <div className="flex flex-col items-center mb-6">
                                <FaUserCircle size={80} />
                                <h1 className="mt-2 text-lg font-semibold">{("myProfile")}</h1>
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-4">{("firstName")}</span>
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
                                <span className="text-sm text-chart-3">{("lastName")}</span>
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
                                <label htmlFor="password" className="text-sm font-medium">
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
                                <label htmlFor="confirmPassword" className="text-sm font-medium">
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
                                    {updateProfileMutation.isPending || replacePasswordMutation.isPending ? ("saving") : isEditing ? ("saveChanges") : ("changeProfile")}
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <section className="rounded-xl border border-border bg-background p-4 shadow-sm">
                                <h2 className="mb-3 text-lg font-semibold">Visele mele</h2>
                                <div className="space-y-2">
                                    {dreamsData?.results.map((dream) => (
                                        <div key={dream.id} className="rounded-lg border border-border p-3">
                                            <p className="font-medium">{dream.title}</p>
                                            <p className="text-xs text-muted-foreground">{dream.status}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-xl border border-border bg-background p-4 shadow-sm">
                                <h2 className="mb-3 text-lg font-semibold">Comentariile mele</h2>
                                <div className="space-y-2">
                                    {commentsData?.results.map((comment) => (
                                        <div key={comment.id} className="rounded-lg border border-border p-3">
                                            <p>{comment.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-xl border border-border bg-background p-4 shadow-sm">
                                <h2 className="mb-3 text-lg font-semibold">Donații pentru vise</h2>
                                <div className="space-y-2">
                                    {dreamDonationsData?.results.map((donation) => (
                                        <div key={donation.id} className="flex justify-between gap-3 rounded-lg border border-border p-3">
                                            <span className="text-sm">{donation.dream?.title || "Vis"}</span>
                                            <span className="font-semibold">{donation.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-xl border border-border bg-background p-4 shadow-sm">
                                <h2 className="mb-3 text-lg font-semibold">Donațiile mele</h2>
                                <div className="space-y-2">
                                    {donationsData?.results.map((donation) => (
                                        <div key={donation.id} className="flex justify-between gap-3 rounded-lg border border-border p-3">
                                            <span className="text-sm">{donation.dream?.title || "Donație"}</span>
                                            <span className="font-semibold">{donation.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-xl border border-border bg-background p-4 shadow-sm">
                                <h2 className="mb-3 text-lg font-semibold">Donații de aripi</h2>
                                <div className="space-y-2">
                                    {wingDonationData?.results.map((donation) => (
                                        <div key={donation.id} className="flex justify-between gap-3 rounded-lg border border-border p-3">
                                            <span className="text-sm">{donation.charity?.title || "Donație de aripi"}</span>
                                            <span className="font-semibold">{donation.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-xl border border-border bg-background p-4 shadow-sm">
                                <h2 className="mb-3 text-lg font-semibold">Toate donațiile</h2>
                                <div className="space-y-2">
                                    {donationsAllData?.map((donation, index) => (
                                        <p key={`${donation}-${index}`} className="rounded-lg border border-border p-3 text-sm">
                                            {donation}
                                        </p>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-xl border border-border bg-background p-4 shadow-sm sm:col-span-2">
                                <h2 className="mb-3 text-lg font-semibold">Toate donațiile de aripi</h2>
                                <div className="grid gap-2 sm:grid-cols-2">
                                    {wingDonationAllData?.map((donation, index) => (
                                        <p key={`${donation}-${index}`} className="rounded-lg border border-border p-3 text-sm">
                                            {donation}
                                        </p>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </form>

        </AuthGuard>
    );

}

export default Profile;