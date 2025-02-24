'use client'

import { Menu} from "@/components/menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const signOut = () => {
        router.push("/admin/signin");
        localStorage.removeItem("token");
    }

    const menu = <Menu
        items={[
            {
                name: "Dashboard",
                href: ["/admin/dashboard"],
                icon: ""
            },
            {
                name: "Merchant",
                href: ["/admin/dashboard/merchant"],
                icon: ""
            },
            {
                name: "Store",
                href: ["/admin/dashboard/store"],
                icon: ""
            },
            {
                name: "Good",
                href: ["/admin/dashboard/good"],
                icon: ""
            },
            {
                name: "Policy",
                href: ["/admin/dashboard/policy"],
                icon: ""
            },
            {
                name: "Setting",
                href: ["/admin/dashboard/setting"],
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
                    <Button
                        size={"icon"}
                        variant='ghost'
                        onClick={() => {
                            signOut();
                        }}
                    >
                        logout
                    </Button>
                </div>
            </div>
            <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-[#f5f5f5] flex items-center z-10">
                Agarwood management system
            </div>
            <div className="ml-64 flex-1 p-8 pt-20 min-h-screen bg-white">
                {children}
            </div>
        </div>
    )
}

export default Layout