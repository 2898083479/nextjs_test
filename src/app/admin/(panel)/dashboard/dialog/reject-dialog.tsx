import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const RejectDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[436px]"
        >
            <div>拒绝</div>
        </WrapperDialog>
    )
}

export default RejectDialog