'use client'

import { Menu, MenuItem } from "@/components/menu";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SideMenu } from "@/components/side-menu";

const Layout = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname()
    const menu = <Menu
        items={[
            {
                name: "Dashboard",
                href: ["/admin/dashboard"],
                icon: ""
            },
            {
                name: "Store",
                href: ["/admin/store"],
                icon: ""
            },
            {
                name: "Good",
                href: ["/admin/good"],
                icon: ""
            }
        ]}
    />
    return (

        <div>
            {children}
        </div>
    )
}

export default Layout