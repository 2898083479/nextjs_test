import { NavMenu } from "@/components/menu";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {

    const menu = <NavMenu
        items={[
            {
                name: "条款设置",
                href: ["/admin/dashboard/setting"],
                icon: ""
            },
            {
                name: "条款信息",
                href: ["/admin/dashboard/setting/info"],
                icon: ""
            }
        ]}
    />

    return (
        <div className="flex flex-col gap-[12px]">
            <div>条款設置界面</div>
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