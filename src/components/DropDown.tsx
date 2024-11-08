import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    ReactElement,
} from "react";

interface DropdownContextType {
    dropDownOpen: boolean;
    handleDDOpen: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
    undefined
);

interface DropdownProviderProps {
    children: ReactNode;
}

export function DropdownProvider({ children }: DropdownProviderProps) {
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const handleDDOpen = () => {
        setDropDownOpen((prev) => !prev);
    };

    return (
        <DropdownContext.Provider value={{ dropDownOpen, handleDDOpen }}>
            {children}
        </DropdownContext.Provider>
    );
}

export const useDropdown = (): DropdownContextType => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdown must be used within a DropdownProvider");
    }
    return context;
};

interface DropdownProps {
    trigger: ReactElement;
    children: ReactNode;
    dropUp?: boolean;
}

export function Dropdown({ trigger, children, dropUp = false }: DropdownProps) {
    return (
        <DropdownProvider>
            <DropdownContent trigger={trigger} dropUp={dropUp}>
                {children}
            </DropdownContent>
        </DropdownProvider>
    );
}

interface DropdownContentProps {
    trigger: ReactElement;
    children: ReactNode;
    dropUp?: boolean;
}

export function DropdownContent({
    trigger,
    children,
    dropUp = false,
}: DropdownContentProps) {
    const { dropDownOpen, handleDDOpen } = useDropdown();

    const DDID = Math.round(Math.random() * 1000);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element | null; // Type casting to Element or null
            if (
                dropDownOpen &&
                target &&
                !target.closest(`.dropdown-container-${DDID}`)
            ) {
                handleDDOpen();
            }
        };

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Escape" && dropDownOpen) {
                handleDDOpen();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [dropDownOpen, handleDDOpen]);

    return (
        <div
            className={`relative inline-block text-left dropdown-container-${DDID} m-0`}
        >
            {React.cloneElement(trigger, { onClick: handleDDOpen })}
            {dropDownOpen && (
                <div
                    className={`absolute min-w-[6rem] w-auto rounded-md shadow-md bg-neutral-200 dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 overflow-hidden z-10 ${
                        dropUp ? "bottom-full mb-2" : "top-full mt-2"
                    }`}
                >
                    <ul>{children}</ul>
                </div>
            )}
        </div>
    );
}

interface ItemProps {
    onClick?: () => void;
    children: ReactNode;
    className?: string;
    title?: string;
}

function Item({ onClick, children, className = "", title }: ItemProps) {
    const { handleDDOpen } = useDropdown();

    const handleItemClick = () => {
        if (onClick) {
            onClick();

            handleDDOpen();
        }
    };

    return (
        <li
            className={
                onClick ? "hover:bg-neutral-100 dark:hover:bg-neutral-700" : ""
            }
        >
            <button
                title={title}
                className={`w-full h-full p-2 text-left focus:outline-none cursor-default ${className}`}
                onClick={handleItemClick}
            >
                {children}
            </button>
        </li>
    );
}

Dropdown.Item = Item;

export default Dropdown;
