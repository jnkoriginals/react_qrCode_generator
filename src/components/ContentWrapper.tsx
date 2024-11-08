import { ReactNode } from "react";

interface ContentWrapperProps {
    children: ReactNode;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
    return (
        <div className='m-auto w-11/12 mt-5 mb-16 md:mt-20 md:w-3/4 rounded-lg p-3 dark:bg-neutral-900 bg-neutral-50 shadow-md'>
            {children}
        </div>
    );
};
