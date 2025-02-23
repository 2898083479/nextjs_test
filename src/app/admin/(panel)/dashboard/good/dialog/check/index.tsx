import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: any;
}

export default function CheckDialog({ open, onOpenChange, data }: Props) {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <div>CheckDialog</div>
        </WrapperDialog>
    )
}