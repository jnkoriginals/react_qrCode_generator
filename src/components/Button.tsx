import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    loading?: boolean;
    children: ReactNode;
}

export const Button: React.FC<IButton> = ({
    onClick,
    variant = "primary",
    size = "medium",
    disabled = false,
    loading = false,
    children,
    ...props
}) => {
    const baseClasses = `box-border justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`;
    const sizeClasses = {
        small: "px-2 py-1 text-sm",
        medium: "px-4 py-2 text-md",
        large: "px-6 py-3 text-lg",
    };
    const variantClasses = {
        primary: "bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-600",
        secondary:
            "bg-gray-600 hover:bg-gray-700 focus-visible:outline-gray-600",
        danger: "bg-red-600 hover:bg-red-700 focus-visible:outline-red-600",
    };

    return (
        <button
            tabIndex={0}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${sizeClasses[size]} ${
                variantClasses[variant]
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            {...props}
        >
            {loading ? <span className='loader mr-2'></span> : children}
        </button>
    );
};
