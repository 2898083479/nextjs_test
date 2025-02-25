"use client";

import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface MenuItemProps {
    onItemClick?: () => void;
    items: {
        name: string;
        href: string[];
        icon: React.ReactNode;
    }[];
}

export const Menu = ({ items, onItemClick }: MenuItemProps) => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-[12px]">
            {items.map((item, index) => (
                <MenuItem
                    key={index}
                    item={item}
                    active={item.href.includes(pathname)}
                    onItemClick={onItemClick}
                />
            ))}
        </div>
    )
}

export const NavMenu = ({ items, onItemClick }: MenuItemProps) => {
    const pathname = usePathname();

    return (
        <div className="flex flex-row gap-[12px]">
            {items.map((item, index) => (
                <HorizontalNavItem
                    key={index}
                    item={item}
                    active={item.href.includes(pathname)}
                    onItemClick={onItemClick}
                />
            ))}
        </div>
    )
}

export const MenuItem = (
    { item: { name, href, icon }, active, onItemClick }:
    { item: { name: string, href: string[], icon: ReactNode }, active: boolean, onItemClick?: () => void }
) => {
    const router = useRouter();

    return (
        <div
            className={classNames(
                "flex items-center w-full h-[45px] rounded-[6px] px-[12px] gap-[10px] cursor-pointer",
                "text-[16px] leading-[110%] whitespace-pre-line",
                active ? `bg-[#E9F5FE] text-[#0C7FDA]` : "bg-transparent text-[#5D7285]"
            )}
            onClick={() => {
                onItemClick?.();
                router.push(href[0]);
            }}
        >
            <p className={classNames(
                active ? "text-[#0C7FDA]" : "text-[#5D7285]"
            )}>
                {icon}
            </p>
            {name}
        </div>
    )
}

export const HorizontalNavItem = (
    { item: { name, href, icon }, active, onItemClick }:
    { item: { name: string, href: string[], icon: ReactNode }, active: boolean, onItemClick?: () => void }
) => {
    const router = useRouter();

    return (
        <div
            className={classNames(
                "flex items-center h-[45px] w-full px-[12px] gap-[10px] cursor-pointer",
                "text-[16px] leading-[110%] whitespace-pre-line",
                active ? `bg-[#E9F5FE] text-[#0C7FDA]` : "bg-transparent text-[#5D7285]"
            )}
            onClick={() => {
                onItemClick?.();
                router.push(href[0]);
            }}
        >
            <p className={classNames(
                active ? "text-[#0C7FDA]" : "text-[#5D7285]"
            )}>
                {icon}
            </p>
            {name}
        </div>
    )
}
