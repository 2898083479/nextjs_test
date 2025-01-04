import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const ApproveDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[436px]"
        >
            <div>审核通过</div>
        </WrapperDialog>
    )
}

export default ApproveDialog