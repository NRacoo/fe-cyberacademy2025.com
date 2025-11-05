"use client";
import Footer from "@/components/layout/footer";
import NavbarDashboard from "@/components/layout/Navbar";
import React, { type FC, type ReactNode } from "react";
interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <NavbarDashboard/>
            {children}
            <Footer/>
        </div>
    );
};

export default Layout;
