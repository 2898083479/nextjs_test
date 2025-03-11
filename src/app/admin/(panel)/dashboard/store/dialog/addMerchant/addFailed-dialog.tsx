import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Button } from "@/components/ui/button"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const AddFailedDialog = ({ open, onOpenChange }: Props) => {
    return (
        <WrapperDialog
            open={open}
            onOpenChange={onOpenChange}
            className="w-[400px] border-none"
        >
            <div className="flex flex-col gap-4">
                <div className="text-lg">
                    新增店员失败
                </div>
                <div className="flex justify-end">
                    <Button
                        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                        onClick={() => onOpenChange(false)}
                    >
                        確定
                    </Button>
                </div>
            </div>
        </WrapperDialog>
    )
}

export default AddFailedDialog;