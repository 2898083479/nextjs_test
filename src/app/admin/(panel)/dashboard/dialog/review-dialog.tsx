import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function ReviewDialog({ open, onOpenChange }: Props) {
    return (
        <WrapperDialog title="立即审核" description="立即审核" open={open} onOpenChange={onOpenChange}>
            <div>立即审核</div>
        </WrapperDialog>
    )
}