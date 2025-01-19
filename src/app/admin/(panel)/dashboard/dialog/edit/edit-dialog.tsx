import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Admin } from "../../types"
interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: Admin
}

export default function EditDialog({ open, onOpenChange}: Props) {
  return (
    <WrapperDialog
        open={open}
        onOpenChange={onOpenChange}
        className="w-[436px]"
    >
        <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold">编辑</div>
        </div>
    </WrapperDialog>
  )
}
