import { ReactNode, useEffect, useRef, useState } from "react";

interface IProps {
    open?: boolean;
    title: string;
    children: ReactNode;
}

export const Collapsable: React.FC<IProps> = ({ open, title, children }) => {
    const [isOpen, setIsOpen] = useState(open);

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };

    const [height, setHeight] = useState<number | undefined>(
        open ? undefined : 0
    );

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!height || !isOpen || !ref.current) return undefined;
        const resizeObserver = new ResizeObserver((el) => {
            setHeight(el[0].contentRect.height);
        });
        resizeObserver.observe(ref.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, [height, isOpen]);

    useEffect(() => {
        if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
        else setHeight(0);
    }, [isOpen]);

    return (
        <>
            <div className=''>
                <div>
                    <div
                        className={`py-4 px-1 border-b border-neutral-400 flex justify-between cursor-pointer active:bg-neutral-200/30 dark:active:bg-neutral-700/20 transition-colors duration-100 col-header ${
                            isOpen && "bg-neutral-200/30 dark:bg-neutral-700/20"
                        }`}
                        onClick={() => handleFilterOpening()}
                    >
                        <h6 className=''>{title}</h6>
                        <p className='flex items-center justify-center'>
                            {!isOpen ? (
                                <span className='w-3 h-3 flex text-current'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 500 320.7'
                                        fill='currentColor'
                                    >
                                        <polygon
                                            points='70.7 320.7 250 141.4 429.3 320.7 500 250 250 0 0 250 70.7 320.7'
                                            strokeWidth='0'
                                        />
                                    </svg>
                                </span>
                            ) : (
                                <span className='w-3 h-3 flex'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 500 320.7'
                                        fill='currentColor'
                                    >
                                        <polygon
                                            points='429.3 0 250 179.3 70.7 0 0 70.7 250 320.7 500 70.7 429.3 0'
                                            strokeWidth='0'
                                        />
                                    </svg>
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                <div
                    className='transition-all duration-350 ease-out px-1'
                    style={{ height }}
                >
                    <div ref={ref}>
                        {isOpen && <div className='py-4'>{children}</div>}
                    </div>
                </div>
            </div>
        </>
    );
};
