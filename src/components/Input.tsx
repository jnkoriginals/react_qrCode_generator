import React from "react";

interface InputProps {
    id: string;
    name: string;
    type: "checkbox" | "radio";
    checked?: boolean;
    value?: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    labelClassName?: string;
}

export const Input: React.FC<InputProps> = ({
    id,
    name,
    type,
    checked,
    value,
    label,
    onChange,
    className,
    labelClassName,
}) => {
    return (
        <div className='flex items-center'>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                checked={checked}
                className={`w-6 h-6 cursor-pointer shadow-sm text-indigo-600 border-neutral-300 rounded-md focus:ring-blue-500 dark:ring-neutral-700 dark:focus:ring-blue-600 dark:focus:ring-offset-neutral-700 focus:ring-2 dark:bg-neutral-800 dark:border-zinc-700 checked:!border-transparent checked:!bg-current ${className}`}
                onChange={onChange}
            />
            <label
                htmlFor={id}
                className={`ml-2 text-sm cursor-pointer leading-6  ${labelClassName}`}
            >
                {label}
            </label>
        </div>
    );
};
