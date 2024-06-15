import { cn } from "@/lib/utils"
import React from "react"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex text-black font-medium h-6 w-full outline-none rounded-md border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
FormInput.displayName = "Input"

export { FormInput }
