import React, { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
        variant?: ButtonVariant;
        children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (
        { 
                variant = "primary",
                children,
                className = "",
                ...props 
        }) => {
        
                const baseStyle = "py-2 px-3 rounded-md focus:outline-none focus:ring transition-colors flex justify-center items-center gap-x-1 cursor-pointer"
                
                let variantStyle = "";
                switch (variant) {
                        case "primary":
                                variantStyle = "bg-cyan-500 hover:bg-cyan-600";
                                break;
                        case "secondary":
                                variantStyle = "bg-zinc-700 hover:bg-zinc-600";
                                break;
                        default:
                                break;
                }

                
                return (
                        <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
                          {children}
                        </button>
                );
};

export default Button;