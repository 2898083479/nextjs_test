import WrapperDialog from "@/components/core/wrapper-dialog/wrapper-dialog"
import { Button } from "@/components/ui/button"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SuccessDialog({ open, onOpenChange }: Props) {
  return (
    <WrapperDialog
      open={open}
      onOpenChange={onOpenChange}
      className="w-[436px]"
    >
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-bold">编辑成功</div>
        <div className="text-sm text-gray-500">您已成功更新该商品信息</div>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              onOpenChange(false)
            }}
          >
            确定
          </Button>
        </div>

      </div>
    </WrapperDialog>
  )
}
