import * as React from "react";
import { cn } from "@/lib/utils";

// 1. Extend the props to include variant and size
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

// 2. Use forwardRef so Framer Motion and other libs can access the DOM element
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    
    // 3. Define style mappings
    const variants = {
      primary: "bg-[#d96535] text-white hover:bg-[#bd542b] shadow-md shadow-[#d96535]/20",
      outline: "border border-[#eaded4] bg-transparent hover:bg-[#f7eee7] text-[#2b211b]",
      ghost: "bg-transparent hover:bg-[#f7eee7] text-[#796b61]",
      default: "bg-[#2b211b] text-white hover:bg-[#3c2d24]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-4 text-base",
      icon: "p-2",
    };

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d96535]/20",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";