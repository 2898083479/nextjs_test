import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Admin } from "../types"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Admin
}


export default function ReviewDialog({ open, onOpenChange, data }: Props) {
    return (
        <WrapperDialog 
        open={open} 
        onOpenChange={onOpenChange}
        className="w-[436px]"
        >
            <div>{data?.name}</div>
            <div>立即审核</div>
        </WrapperDialog>
    )
}