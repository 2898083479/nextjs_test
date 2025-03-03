'use client'

import { NavMenu } from "@/components/menu";
import { useRouter } from "next/navigation";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const menu = <NavMenu
        items={[
            {
                name: "Setting",
                href: ["/admin/dashboard/setting"],
                icon: ""
            },
            {
                name: "Info",
                href: ["/admin/dashboard/setting/info"],
                icon: ""
            },
            {
                name: "Policy",
                href: ["/admin/dashboard/setting/policy"],
                icon: ""
            }
        ]}
    />

    return (
        <div className="flex flex-col gap-[12px]">
            <div>Policy設置界面</div>
            <div>
                {menu}
            </div>
            <div className="flex-1 bg-white w-full">
                {children}
            </div>
        </div>
    )
}

export default SettingLayout;