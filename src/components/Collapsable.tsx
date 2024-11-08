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
                        <p>{!isOpen ? "open" : "close"}</p>
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
