import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DialogOverlay } from "@radix-ui/react-dialog"
import ReactDOM from "react-dom"

interface Props {
    title?: string
    description?: string
    children: React.ReactNode
    className?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

const WrapperDialog = ({ title, description, children, className, open, onOpenChange }: Props) => {
    // 使用 ReactDOM.createPortal 将对话框渲染到 document.body
    // 这样可以避免对话框被父元素的 CSS 属性影响（如 overflow、z-index 等）
    // 同时确保对话框始终显示在最上层
    return ReactDOM.createPortal(
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogOverlay />
            <DialogContent className={className}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>,
        document.body
    )
}

export default WrapperDialog