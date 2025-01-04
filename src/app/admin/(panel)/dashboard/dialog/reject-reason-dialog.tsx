import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const RejectReasonDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[436px]"
        >
            <div>拒绝原因填写</div>
        </WrapperDialog>
    )
}

export default RejectReasonDialog