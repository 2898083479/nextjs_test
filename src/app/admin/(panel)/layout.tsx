'use client'

import { Menu} from "@/components/menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const signOut = () => {
        router.push("/admin/signin");
        localStorage.removeItem("accessToken");
    }

    const menu = <Menu
        items={[
            {
                name: "面板",
                href: ["/admin/dashboard"],
                icon: ""
            },
            {
                name: "用户",
                href: ["/admin/dashboard/merchant"],
                icon: ""
            },
            {
                name: "店铺",
                href: ["/admin/dashboard/store"],
                icon: ""
            },
            {
                name: "商品",
                href: ["/admin/dashboard/good"],
                icon: ""
            },
            {
                name: "条款",
                href: ["/admin/dashboard/policy"],
                icon: ""
            },
            {
                name: "订单",
                href: ["/admin/dashboard/order"],
                icon: ""
            },
            {
                name: "设置",
                href: ["/admin/dashboard/setting"],
                icon: ""
            },
        ]}
    />
    return (
        <div style={{backgroundImage: "url('/image/backgroud-image.jpg')"}}>
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
                        登出
                    </Button>
                </div>
            </div>
            <div className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 bg-[#f5f5f5] flex items-center z-10">
                沉香交易系统
            </div>
            <div className="ml-64 flex-1 p-8 pt-20 min-h-screen bg-white">
                {children}
            </div>
        </div>
    )
}

export default Layout