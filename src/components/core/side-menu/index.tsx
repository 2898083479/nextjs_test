import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ReactNode } from "react"

interface Props {
    className?: string;
    children: ReactNode;
}

export const SideMenu = ({ className, children }: Props) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className={className}
                >
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className="w-[300px] pr-[48px] flex flex-col gap-[32px]"
                onOpenAutoFocus={(event: Event) => event.preventDefault()}
            >
                <SheetHeader >
                    <SheetTitle className="text-center font-['DIN Pro'] font-bold text-[18px] leading-[22.54px] text-[#0C7FDA]">
                        Fund Raising Saas
                    </SheetTitle>
                    <SheetDescription className="hidden" />
                </SheetHeader>
                <div className="flex flex-col gap-[12px]">
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    )
}