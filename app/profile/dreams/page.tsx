"use client"
import AuthGuard from "@/components/layout/AuthGuard";
import useProfileQueries from "@/components/hooks/useProfileQueries"
import SidebarProfile from "@/components/core/SidebarProfile"

function Dreams() {

    const {
        handleSubmit,
        onSubmit,

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
            <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen">
                <div className="flex min-h-screen items-center justify-center bg-accent px-4 py-10">
                    <div className="w-full max-w-6xl">
                        <SidebarProfile />
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

export default Dreams