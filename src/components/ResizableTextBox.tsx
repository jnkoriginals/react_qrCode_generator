import { forwardRef, TextareaHTMLAttributes } from "react";

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    placeholder?: string;
}

export const ResizableTextBox = forwardRef<HTMLTextAreaElement, ITextarea>(
    ({ label, error, placeholder, ...props }, ref) => {
        return (
            <div className='flex flex-col w-full'>
                {label && (
                    <label
                        htmlFor={props.id}
                        className='text-gray-700 dark:text-gray-300 mb-2'
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    placeholder={placeholder}
                    className={`flex w-full rounded-md border-0 p-1.5 ring-1 ring-inset dark:bg-neutral-800 bg-neutral-200/30 placeholder:text-neutral-400 resize-y
                        ${
                            error
                                ? "ring-red-500"
                                : "ring-neutral-300 dark:ring-neutral-600"
                        }
                        focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    aria-invalid={!!error}
                    {...props}
                />
                {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
            </div>
        );
    }
);

ResizableTextBox.displayName = "ResizableTextBox";
