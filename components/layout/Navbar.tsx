"use client"
import { NAVIGATION_DASHBOARD_ITEMS } from "@/lib/dashboard";
import { HEADER_CONFIG } from "@/lib/constants";
import { useRouter } from "next/navigation";
import StaggeredDashboard from "../StaggeredDashboard";
import Cookies from "js-cookie";

export default function NavbarDashboard(){
    const router = useRouter();
    const handleLogout = () =>{
        Cookies.remove("token")
        router.push("/login")
    }

    const dashboardItems = [
        ...NAVIGATION_DASHBOARD_ITEMS,
        {
            label:"Logout",
            ariaLabel:"Logout from dashboard",
            link:"#",
            isButton:true,
            action: handleLogout,
        }
    ]

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <StaggeredDashboard
            isFixed={true}
            position={HEADER_CONFIG.position}
            logoUrl={HEADER_CONFIG.logoUrl}
            menuButtonColor={HEADER_CONFIG.menuButtonColor}
            openMenuButtonColor={HEADER_CONFIG.openMenuButtonColor}
            accentColor={HEADER_CONFIG.accentColor}
            colors={HEADER_CONFIG.colors}
            items={dashboardItems}
            />
        </header>
    )
}