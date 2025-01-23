'use client'

import { Menu, MenuItem } from "@/components/menu";
import { usePathname } from "next/navigation";

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
                name: "Merchant",
                href: ["/admin/merchant"],
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
            },
            {
                name: "Policy",
                href: ["/admin/policy"],
                icon: ""
            },
        ]}
    />
    return (
        <div>
            <div className="fixed left-0 top-0 h-screen w-64 bg-[#f5f5f5] text-white p-4">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-center text-[#0ea5e9]">管理面板</h1>
                </div>
                {menu}
                <div className="flex absolute bottom-4 text-black">
                    logout
                </div>
            </div>
            <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-[#f5f5f5] flex items-center z-10">
                NEXTJS01
            </div>
            <div className="ml-64 flex-1 p-8 pt-20 min-h-screen bg-white">
                {children}
            </div>
        </div>
    )
}

export default Layout