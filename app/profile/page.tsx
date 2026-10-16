"use client"
import { FaUserCircle } from "react-icons/fa";
import AuthGuard from "@/components/layout/AuthGuard";
import useProfileQueries from "@/components/hooks/useProfileQueries"
import SidebarProfile from "@/components/core/SidebarProfile"
function Profile() {
    const {
        register,
    } = useProfileQueries()
    return (
        <AuthGuard>
            <div className="min-h-screen">
                <div className="flex min-h-[calc(100vh-10.1875rem)] items-center justify-center bg-accent px-4 py-10">
                    <div className="w-full max-w-md">
                        <div className="h-fit w-full rounded-2xl border border-border bg-background p-6 shadow-lg">

                            <SidebarProfile />
                            <div className="flex flex-col items-center mb-6">
                                <FaUserCircle size={80} />
                                <h1 className="mt-2 text-lg font-semibold">{("Profile User")}</h1>
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-4">{("First Name")}</span>
                                <input
                                    type="text"
                                    {...register("firstName")}
                                    readOnly
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-3">{("Last Name")}</span>
                                <input
                                    type="text"
                                    {...register("lastName")}
                                    readOnly
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>
                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-3">{("Email")}</span>
                                <input
                                    type="text"
                                    {...register("email")}
                                    readOnly
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-3">{("Description")}</span>
                                <input
                                    type="text"
                                    {...register("description")}
                                    readOnly
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>
                            
                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-3">{("Phone Number")}</span>
                                <input
                                    type="text"
                                    {...register("phoneNumber")}
                                    readOnly
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-3">{("Gender")}</span>
                                <input
                                    type="text"
                                    {...register("gender")}
                                    readOnly
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-3">{("Birthday")}</span>
                                <input
                                    type="text"
                                    {...register("birthday")}
                                    readOnly
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-3">{("City")}</span>
                                <input
                                    type="text"
                                    {...register("city")}
                                    readOnly
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-3">{("Country")}</span>
                                <input
                                    type="text"
                                    {...register("country")}
                                    readOnly
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-chart-3">{("Onboarding Status")}</span>
                                <input
                                    type="text"
                                    {...register("onboardingStatus")}
                                    readOnly
                                    className="border rounded-lg px-3 py-2 text-sm w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );

}

export default Profile;