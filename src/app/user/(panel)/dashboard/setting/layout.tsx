import { NavMenu } from "@/components/menu";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {

    const menuItems = <NavMenu
        items={[
            {
                name: '我的店铺',
                href: ['/user/dashboard/setting/my-store'],
                icon: ''
            },
            {
                name: '个人信息',
                href: ['/user/dashboard/setting'],
                icon: ''
            }
        ]}
    />

    return (
        <div className="flex flex-col gap-[12px]">
            <div>
                {menuItems}
            </div>
            <div className="flex-1 bg-white w-full">
                {children}
            </div>
        </div>
    )
}

export default SettingLayout;