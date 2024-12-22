import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function FinishDialog({ open, onOpenChange }: Props) {
    const router = useRouter()
    return (
        <WrapperDialog 
        title="重置密码成功" 
        description="密码重置成功，请重新登录" 
        open={open} 
        onOpenChange={onOpenChange}
        className="w-[387px]"
        >
            <div className="flex justify-end">
                <Button onClick={
                    () => {
                        onOpenChange(false)
                        router.push("/admin/signin")
                    }
                }>
                    返回登录
                </Button>
            </div>
        </WrapperDialog>
    )
}