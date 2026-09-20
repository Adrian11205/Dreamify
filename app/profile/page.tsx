"use client"
import AuthGuard from "@/components/layout/AuthGuard";
import SidebarProfile from "@/components/core/SidebarProfile"

function Profile() {
    return (
        <AuthGuard>
            <div>
                <SidebarProfile />
            </div>
        </AuthGuard>
    );

}

export default Profile;