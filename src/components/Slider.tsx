import { ChangeEvent } from "react";

interface ISlider {
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
}

export const Slider: React.FC<ISlider> = ({
    min,
    max,
    step = 1,
    value,
    onChange,
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value));
    };

    return (
        <div className='flex flex-col items-start gap-2'>
            <div className='flex items-center gap-2 w-full'>
                <input
                    type='range'
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    className={`w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2  dark:bg-neutral-800 dark:border-neutral-700 shadow-sm `}
                />
                <span className='text-sm font-medium'>{value}</span>
            </div>
        </div>
    );
};
