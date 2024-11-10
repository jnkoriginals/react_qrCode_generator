import { ReactNode } from "react";

interface ContentWrapperProps {
    children: ReactNode;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
    return (
        <div className='md:m-auto w-full m-2 h-min md:mb-16 md:mt-20 md:w-3/4 rounded-lg p-3 dark:bg-neutral-900 bg-neutral-50 shadow-md'>
            {children}
        </div>
    );
};
