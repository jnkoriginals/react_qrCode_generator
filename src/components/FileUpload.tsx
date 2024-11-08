import React from "react";

interface IFileUploadProps {
    id: string;
    name: string;
    onChange: (file: string | null) => void;
}

export const FileUpload: React.FC<IFileUploadProps> = ({
    id,
    name,
    onChange,
}) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const isImage = file.type.startsWith("image/");
            if (isImage) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        onChange(reader.result as string);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                onChange(null);
            }
        }
    };

    return (
        <div className='flex flex-col items-start gap-2'>
            <input
                id={id}
                name={name}
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className={`w-full file:cursor-pointer file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-neutral-50 file:rounded-md file:hover:bg-indigo-700 file:focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 file:mr-3`}
            />
        </div>
    );
};
