export const Footer: React.FC = () => {
    return (
        <div className='w-full py-12 flex bg-white/30 dark:bg-black/30'>
            <div className='w-full lg:w-3/4 m-auto flex flex-col gap-4 justify-center px-2 items-center text-sm text-center text-neutral-950/60 dark:text-neutral-50/65 '>
                <p>
                    QR Code is a registered trademark of DENSO WAVE INCORPORATED
                    in the United States and other countries.
                </p>
                <p>
                    This project was created using{" "}
                    <a
                        className='font-semibold text-neutral-950 dark:text-neutral-50/80 hover:text-indigo-500/60'
                        href='https://vite.dev'
                    >
                        vite
                    </a>
                    ,{" "}
                    <a
                        className='font-semibold text-neutral-950 dark:text-neutral-50/80 hover:text-indigo-500/60'
                        href='https://react.dev'
                    >
                        react
                    </a>
                    ,{" "}
                    <a
                        className='font-semibold text-neutral-950 dark:text-neutral-50/80 hover:text-indigo-500/60'
                        href='https://tailwindcss.com'
                    >
                        tailwindcss
                    </a>
                    ,{" "}
                    <a
                        className='font-semibold text-neutral-950 dark:text-neutral-50/80 hover:text-indigo-500/60'
                        href='https://www.npmjs.com/package/@uiw/react-color-chrome'
                    >
                        react-color-chrome
                    </a>{" "}
                    and{" "}
                    <a
                        className='font-semibold text-neutral-950 dark:text-neutral-50/80 hover:text-indigo-500/60'
                        href='https://www.npmjs.com/package/react-qrcode-logo?activeTab=readme'
                    >
                        react-qrcode-logo
                    </a>
                </p>
                <p>
                    by{" "}
                    <a
                        className='font-semibold text-neutral-950 dark:text-neutral-50/80 hover:text-indigo-500/60'
                        href='https://github.com/jnkoriginals'
                    >
                        Jannik Thieme
                    </a>
                </p>
            </div>
        </div>
    );
};
