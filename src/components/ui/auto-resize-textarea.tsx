import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, onChange, ...props }, ref) => {
        const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

        // Combine refs
        React.useImperativeHandle(ref, () => textareaRef.current!)

        const resizeTextarea = () => {
            const textarea = textareaRef.current
            if (textarea) {
                textarea.style.height = "auto"
                textarea.style.height = `${textarea.scrollHeight}px`
            }
        }

        React.useEffect(() => {
            resizeTextarea()
        }, [props.value])

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            resizeTextarea()
            if (onChange) {
                onChange(e)
            }
        }

        return (
            <textarea
                className={cn(
                    "flex min-h-[150px] max-h-[50vh] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-y-auto",
                    className
                )}
                ref={textareaRef}
                onChange={handleChange}
                {...props}
            />
        )
    }
)
AutoResizeTextarea.displayName = "AutoResizeTextarea"

export { AutoResizeTextarea }
