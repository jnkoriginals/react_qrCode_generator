import { useRef, useState } from "react";
import { Button } from "./components/Button";
import { Collapsable } from "./components/Collapsable";
import { ContentWrapper } from "./components/ContentWrapper";
import Dropdown from "./components/DropDown";
import { TextField } from "./components/TextField";
import ThemeToggle from "./components/ThemeToggle";
import { QRCode } from "react-qrcode-logo";
import "./components/colorPicker.css";
import Chrome, { ChromeInputType } from "@uiw/react-color-chrome";
import { Input } from "./components/Input";
import { Slider } from "./components/Slider";
import { FileUpload } from "./components/FileUpload";
import { ResizableTextBox } from "./components/ResizableTextBox";
import { Footer } from "./components/Footer";

enum QRStyle {
    SQUARES = "squares",
    DOTS = "dots",
    FLUID = "fluid",
}

enum ErrorCorrectionLevel {
    L = "L",
    M = "M",
    Q = "Q",
    H = "H",
}

enum ImagePaddingStyle {
    SQUARE = "square",
    CIRCLE = "circle",
}

enum ContentOptions {
    TEXT = "text",
    URL = "url",
    PHONE_NBR = "phone_nbr",
    VCARD = "vcard",
}

interface VCardData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    organization: string;
    title: string;
}

const black = "#001010";
const white = "#fefffe";

const qrSize = 280;

const exportFileName = "qr_code";

function App() {
    const [qrCodeColor, setQrCodeColor] = useState<string>(black);
    const [qrBgColor, setQrBgColor] = useState<string>(white);

    const [qrStyle, setQrStyle] = useState<QRStyle>(QRStyle.SQUARES);
    const [ecLevel, setEcLevel] = useState<ErrorCorrectionLevel>(
        ErrorCorrectionLevel.M
    );
    const [eyeRadius, setEyeRadius] = useState<number>(0);
    const [quietZone, setQuietZone] = useState<number>(10);

    const [customEyeColor, setCustomEyeColor] = useState<string>(black);
    const [useCustomEyeColor, setUseCustomEyeColor] = useState<boolean>(false);

    const [qrContent, setQrContent] = useState<string>(
        "https://www.simpli.menu"
    );

    const handleQrStyleChange = (style: QRStyle) => {
        setQrStyle(style);
    };

    const handleEcLevelChange = (ecLevel: ErrorCorrectionLevel) => {
        setEcLevel(ecLevel);
    };

    const handleImagePaddingStyleChange = (style: ImagePaddingStyle) => {
        setImagePaddingStyle(style);
    };

    const qrRef = useRef<QRCode>(null);
    const fileUploadRef = useRef<HTMLInputElement>(null);

    const exportImage = (format: "png" | "jpeg") => {
        if (qrRef.current === null) {
            return;
        }

        switch (format) {
            case "png":
                qrRef.current?.download("png", exportFileName);
                break;
            case "jpeg":
                qrRef.current?.download("jpg", exportFileName);
                break;
            default:
                break;
        }
    };

    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
    const [imageError, setImageError] = useState<string | null>(null);

    const [imageWidth, setImageWidth] = useState<number>(qrSize * 0.2);
    const [imageHeight, setImageHeight] = useState<number>(imageWidth);
    const [useCustomImageHeight, setUseCustomImageHeight] =
        useState<boolean>(false);

    const [removeQrBehindImage, setRemoveQrBehindImage] =
        useState<boolean>(false);

    const [imagePaddingStyle, setImagePaddingStyle] =
        useState<ImagePaddingStyle>(ImagePaddingStyle.SQUARE);

    const [imagePadding, setImagePadding] = useState<number>(0);
    const [imageOpacity, setImageOpacity] = useState<number>(1);

    const handleFileChange = (file: string | null) => {
        if (file) {
            setImageSrc(file);
            setImageError(null);
        } else {
            setImageSrc(undefined);
            setImageError("Please upload a valid image file.");
        }
    };

    const [contentOption, setContentOption] = useState<ContentOptions>(
        ContentOptions.URL
    );

    const handleContentOption = (option: ContentOptions) => {
        setContentOption(option);
    };

    const [formData, setFormData] = useState<VCardData>({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        organization: "",
        title: "",
    });

    function generateVCard(data: VCardData): string {
        return `BEGIN:VCARD
VERSION:3.0
FN:${data.firstName} ${data.lastName}
N:${data.lastName};${data.firstName};;;
TEL;TYPE=CELL:${data.phone}
EMAIL:${data.email}
ADR;TYPE=HOME:;;${data.address}
ORG:${data.organization}
TITLE:${data.title}
END:VCARD`;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const vCardString = generateVCard(formData);
        setQrContent(vCardString);
    };

    const exportConfig = () => {
        const config = {
            qrCodeColor,
            qrBgColor,
            qrStyle,
            ecLevel,
            eyeRadius,
            quietZone,
            customEyeColor,
            useCustomEyeColor,
            qrContent,
            imageSrc,
            imageWidth,
            imageHeight,
            useCustomImageHeight,
            removeQrBehindImage,
            imagePaddingStyle,
            imagePadding,
            imageOpacity,
            contentOption,
            formData,
        };
        const blob = new Blob([JSON.stringify(config)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "qrConfig.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const importConfig = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const config = JSON.parse(event.target?.result as string);
                setQrCodeColor(config.qrCodeColor);
                setQrBgColor(config.qrBgColor);
                setQrStyle(config.qrStyle);
                setEcLevel(config.ecLevel);
                setEyeRadius(config.eyeRadius);
                setQuietZone(config.quietZone);
                setCustomEyeColor(config.customEyeColor);
                setUseCustomEyeColor(config.useCustomEyeColor);
                setQrContent(config.qrContent);
                setImageSrc(config.imageSrc);
                setImageWidth(config.imageWidth);
                setImageHeight(config.imageHeight);
                setUseCustomImageHeight(config.useCustomImageHeight);
                setRemoveQrBehindImage(config.removeQrBehindImage);
                setImagePaddingStyle(config.imagePaddingStyle);
                setImagePadding(config.imagePadding);
                setImageOpacity(config.imageOpacity);
                setContentOption(config.contentOption);
                setFormData(config.formData);
            } catch (error) {
                console.error("Invalid configuration file", error);
            }
        };
        reader.readAsText(file);
    };

    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <div className='flex flex-1'>
                    <ContentWrapper>
                        <div className='flex items-center gap-4 justify-between w-full pb-6 pt-3 border-b border-neutral-400'>
                            <div className=' flex gap-4 items-center'>
                                <h1 className='flex text-lg md:text-3xl font-semibold items-center'>
                                    QR Generate
                                </h1>
                                <Dropdown
                                    dropUp={false}
                                    trigger={
                                        <Button
                                            onClick={() => {}}
                                            className={
                                                "relative select-container px-2 flex w-full h-9 items-center dark:ring-neutral-700 ring-neutral-300 rounded-lg text-neutral-900 dark:text-white shadow-sm ring-1 ring-inset dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-200/70 hover:bg-neutral-300/80 placeholder:text-neutral-400 focus-within:ring-2 focus-within:ring-inset focus-within:!ring-indigo-600 sm:text-sm sm:leading-6"
                                            }
                                        >
                                            Content: {contentOption}
                                        </Button>
                                    }
                                >
                                    <Dropdown.Item
                                        className='cursor-pointer'
                                        onClick={() =>
                                            handleContentOption(
                                                ContentOptions.URL
                                            )
                                        }
                                    >
                                        Url
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        className='cursor-pointer'
                                        onClick={() =>
                                            handleContentOption(
                                                ContentOptions.TEXT
                                            )
                                        }
                                    >
                                        Text
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        className='cursor-pointer'
                                        onClick={() =>
                                            handleContentOption(
                                                ContentOptions.PHONE_NBR
                                            )
                                        }
                                    >
                                        Phone Number
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        className='cursor-pointer'
                                        onClick={() =>
                                            handleContentOption(
                                                ContentOptions.VCARD
                                            )
                                        }
                                    >
                                        VCard
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                            <ThemeToggle />
                        </div>
                        <div className='flex lg:flex-row flex-col mt-6 gap-4'>
                            <div className='flex flex-col w-full lg:w-7/12'>
                                <Collapsable title='Content' open>
                                    {contentOption === ContentOptions.URL && (
                                        <TextField
                                            onChange={(e) => {
                                                setQrContent(e.target.value);
                                            }}
                                            value={qrContent}
                                            label='URL'
                                            id='url'
                                            placeholder='Enter URL ...'
                                        />
                                    )}
                                    {contentOption === ContentOptions.TEXT && (
                                        <ResizableTextBox
                                            onChange={(e) => {
                                                setQrContent(e.target.value);
                                            }}
                                            value={qrContent}
                                            placeholder='Enter text content ...'
                                            label='Text'
                                        />
                                    )}
                                    {contentOption ===
                                        ContentOptions.PHONE_NBR && (
                                        <TextField
                                            onChange={(e) => {
                                                setQrContent(e.target.value);
                                            }}
                                            value={qrContent}
                                            type='tel'
                                            label='Phone Number'
                                            id='phone_nbr'
                                            placeholder='Enter Phone Number ...'
                                        />
                                    )}
                                    {contentOption === ContentOptions.VCARD && (
                                        <form
                                            onSubmit={handleSubmit}
                                            className='space-y-4'
                                        >
                                            <TextField
                                                label='First Name'
                                                name='firstName'
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                label='Last Name'
                                                name='lastName'
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                label='Phone'
                                                name='phone'
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                label='Email'
                                                name='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                label='Address'
                                                name='address'
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                label='Organization'
                                                name='organization'
                                                value={formData.organization}
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                label='Title'
                                                name='title'
                                                value={formData.title}
                                                onChange={handleChange}
                                            />
                                            <Button
                                                type='submit'
                                                onClick={() => {}}
                                            >
                                                Generate VCard QR Code
                                            </Button>
                                        </form>
                                    )}
                                </Collapsable>
                                <Collapsable title='Colors'>
                                    <div className='flex flex-wrap gap-2'>
                                        <Dropdown
                                            dropUp={true}
                                            trigger={
                                                <Button
                                                    onClick={() => {}}
                                                    className={
                                                        "relative select-container px-2 flex w-full h-9 items-center dark:ring-neutral-700 ring-neutral-300 rounded-lg text-neutral-900 dark:text-white shadow-sm ring-1 ring-inset dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-200/70 hover:bg-neutral-300/80 placeholder:text-neutral-400 focus-within:ring-2 focus-within:ring-inset focus-within:!ring-indigo-600 sm:text-sm sm:leading-6"
                                                    }
                                                >
                                                    <div className='flex align-middle items-center gap-2 '>
                                                        <div
                                                            style={{
                                                                background:
                                                                    qrCodeColor,
                                                            }}
                                                            className='w-6 h-4 inline-block rounded-sm outline outline-1 outline-neutral-100 dark:outline-neutral-700'
                                                        ></div>
                                                        QR Code Color
                                                    </div>
                                                </Button>
                                            }
                                        >
                                            <Dropdown.Item>
                                                <Chrome
                                                    color={qrCodeColor}
                                                    showAlpha={false}
                                                    onChange={(color) => {
                                                        setQrCodeColor(
                                                            color.hex
                                                        );
                                                    }}
                                                    inputType={
                                                        ChromeInputType.HEXA
                                                    }
                                                />
                                            </Dropdown.Item>
                                        </Dropdown>

                                        <Dropdown
                                            dropUp={true}
                                            trigger={
                                                <Button
                                                    onClick={() => {}}
                                                    className={
                                                        "relative select-container px-2 flex w-full h-9 items-center dark:ring-neutral-700 ring-neutral-300 rounded-md text-neutral-900 dark:text-white shadow-sm ring-1 ring-inset dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-200/70 hover:bg-neutral-300/80 placeholder:text-neutral-400 focus-within:ring-2 focus-within:ring-inset focus-within:!ring-indigo-600 sm:text-sm sm:leading-6"
                                                    }
                                                >
                                                    <div className='flex align-middle items-center gap-2 '>
                                                        <div
                                                            style={{
                                                                background:
                                                                    qrBgColor,
                                                            }}
                                                            className='w-6 h-4 inline-block rounded-sm outline outline-1 outline-neutral-100 dark:outline-neutral-700'
                                                        ></div>
                                                        Background Color
                                                    </div>
                                                </Button>
                                            }
                                        >
                                            <Dropdown.Item>
                                                <Chrome
                                                    color={qrBgColor}
                                                    showAlpha={false}
                                                    onChange={(color) => {
                                                        setQrBgColor(color.hex);
                                                    }}
                                                    inputType={
                                                        ChromeInputType.HEXA
                                                    }
                                                />
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                    <div className='flex items-center gap-4 mt-4'>
                                        <div>
                                            <Dropdown
                                                dropUp={true}
                                                trigger={
                                                    <Button
                                                        onClick={() => {}}
                                                        className={
                                                            "relative select-container px-2 flex w-full h-9 items-center dark:ring-neutral-700 ring-neutral-300 rounded-md text-neutral-900 dark:text-white shadow-sm ring-1 ring-inset dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-200/70 hover:bg-neutral-300/80 placeholder:text-neutral-400 focus-within:ring-2 focus-within:ring-inset focus-within:!ring-indigo-600 sm:text-sm sm:leading-6"
                                                        }
                                                    >
                                                        <div className='flex align-middle items-center gap-2 '>
                                                            <div
                                                                style={{
                                                                    background:
                                                                        customEyeColor,
                                                                }}
                                                                className='w-6 h-4 inline-block rounded-sm outline outline-1 outline-neutral-100 dark:outline-neutral-700'
                                                            ></div>
                                                            Custom Eye Color
                                                        </div>
                                                    </Button>
                                                }
                                            >
                                                <Dropdown.Item>
                                                    <Chrome
                                                        color={customEyeColor}
                                                        showAlpha={false}
                                                        onChange={(color) => {
                                                            setCustomEyeColor(
                                                                color.hex
                                                            );
                                                        }}
                                                        inputType={
                                                            ChromeInputType.HEXA
                                                        }
                                                    />
                                                </Dropdown.Item>
                                            </Dropdown>
                                        </div>
                                        <div>
                                            <Input
                                                id='customEyeColor'
                                                name='customEyeColor'
                                                type='checkbox'
                                                label='Use custom eye color'
                                                checked={useCustomEyeColor}
                                                onChange={() => {
                                                    setUseCustomEyeColor(
                                                        (prev) => !prev
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Collapsable>
                                <Collapsable title='Center Image'>
                                    <div className='flex flex-col gap-4'>
                                        <p>Upload center image</p>
                                        <span className='flex flex-col gap-2'>
                                            <FileUpload
                                                id='fileUpload'
                                                name='file'
                                                onChange={handleFileChange}
                                                ref={fileUploadRef}
                                            />
                                            {imageError && (
                                                <div className='mt-4 text-red-500 dark:text-red-400'>
                                                    <strong>Error:</strong>{" "}
                                                    {imageError}
                                                </div>
                                            )}
                                            <p>
                                                <a
                                                    className='cursor-pointer dark:text-neutral-50/30 dark:hover:text-neutral-400 hover:text-neutral-800 text-neutral-950/55'
                                                    onClick={() => {
                                                        setImageSrc("");

                                                        if (
                                                            fileUploadRef.current
                                                        ) {
                                                            fileUploadRef.current.value =
                                                                "";
                                                        }
                                                    }}
                                                >
                                                    Remove image
                                                </a>
                                            </p>
                                        </span>
                                        <p>Image Width</p>
                                        <Slider
                                            min={0}
                                            max={120}
                                            step={1}
                                            value={imageWidth}
                                            onChange={setImageWidth}
                                        />
                                        <p>Image Height</p>
                                        <Slider
                                            min={0}
                                            max={120}
                                            step={1}
                                            value={imageHeight}
                                            onChange={setImageHeight}
                                        />
                                        <Input
                                            id='customImageHeight'
                                            name='customImageHeight'
                                            type='checkbox'
                                            label='Use custom image height'
                                            checked={useCustomImageHeight}
                                            onChange={() => {
                                                setUseCustomImageHeight(
                                                    (prev) => !prev
                                                );
                                            }}
                                        />
                                        <Input
                                            id='removeQrBehindImage'
                                            name='removeQrBehindImage'
                                            type='checkbox'
                                            label='Remove QR Code behind Image'
                                            checked={removeQrBehindImage}
                                            onChange={() => {
                                                setRemoveQrBehindImage(
                                                    (prev) => !prev
                                                );
                                            }}
                                        />
                                        <p>Image Padding</p>
                                        <Slider
                                            min={0}
                                            max={25}
                                            step={1}
                                            value={imagePadding}
                                            onChange={setImagePadding}
                                        />
                                        <p>Image Opacity</p>
                                        <Slider
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            value={imageOpacity}
                                            onChange={setImageOpacity}
                                        />
                                        <p>Image Padding Style</p>
                                        <div className='flex gap-2'>
                                            <Input
                                                id='square'
                                                name='square'
                                                type='radio'
                                                label='Square'
                                                checked={
                                                    imagePaddingStyle ===
                                                    ImagePaddingStyle.SQUARE
                                                }
                                                onChange={() =>
                                                    handleImagePaddingStyleChange(
                                                        ImagePaddingStyle.SQUARE
                                                    )
                                                }
                                            />
                                            <Input
                                                id='circle'
                                                name='circle'
                                                type='radio'
                                                label='Circle'
                                                checked={
                                                    imagePaddingStyle ===
                                                    ImagePaddingStyle.CIRCLE
                                                }
                                                onChange={() =>
                                                    handleImagePaddingStyleChange(
                                                        ImagePaddingStyle.CIRCLE
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </Collapsable>
                                <Collapsable title='Advanced'>
                                    <div className='flex flex-col gap-4'>
                                        <p>QR Code Style</p>
                                        <div className='flex gap-2'>
                                            <Input
                                                id='squares'
                                                name='squares'
                                                type='radio'
                                                label='Squares'
                                                checked={
                                                    qrStyle === QRStyle.SQUARES
                                                }
                                                onChange={() =>
                                                    handleQrStyleChange(
                                                        QRStyle.SQUARES
                                                    )
                                                }
                                            />
                                            <Input
                                                id='dots'
                                                name='dots'
                                                type='radio'
                                                label='Dots'
                                                checked={
                                                    qrStyle === QRStyle.DOTS
                                                }
                                                onChange={() =>
                                                    handleQrStyleChange(
                                                        QRStyle.DOTS
                                                    )
                                                }
                                            />
                                            <Input
                                                id='fluid'
                                                name='fluid'
                                                type='radio'
                                                label='Fluid'
                                                checked={
                                                    qrStyle === QRStyle.FLUID
                                                }
                                                onChange={() =>
                                                    handleQrStyleChange(
                                                        QRStyle.FLUID
                                                    )
                                                }
                                            />
                                        </div>
                                        <p>Eye Radius</p>
                                        <Slider
                                            min={0}
                                            max={35}
                                            step={1}
                                            value={eyeRadius}
                                            onChange={setEyeRadius}
                                        />
                                        <p>Quiet Zone</p>
                                        <Slider
                                            min={5}
                                            max={25}
                                            step={1}
                                            value={quietZone}
                                            onChange={setQuietZone}
                                        />
                                        <p>Error Correction Level</p>
                                        <div className='flex gap-2 justify-between'>
                                            <Input
                                                id='L'
                                                name='L'
                                                type='radio'
                                                label='Low'
                                                checked={
                                                    ecLevel ===
                                                    ErrorCorrectionLevel.L
                                                }
                                                onChange={() =>
                                                    handleEcLevelChange(
                                                        ErrorCorrectionLevel.L
                                                    )
                                                }
                                            />
                                            <Input
                                                id='M'
                                                name='M'
                                                type='radio'
                                                label='Medium'
                                                checked={
                                                    ecLevel ===
                                                    ErrorCorrectionLevel.M
                                                }
                                                onChange={() =>
                                                    handleEcLevelChange(
                                                        ErrorCorrectionLevel.M
                                                    )
                                                }
                                            />
                                            <Input
                                                id='Q'
                                                name='Q'
                                                type='radio'
                                                label='Quartil'
                                                checked={
                                                    ecLevel ===
                                                    ErrorCorrectionLevel.Q
                                                }
                                                onChange={() =>
                                                    handleEcLevelChange(
                                                        ErrorCorrectionLevel.Q
                                                    )
                                                }
                                            />
                                            <Input
                                                id='H'
                                                name='H'
                                                type='radio'
                                                label='High'
                                                checked={
                                                    ecLevel ===
                                                    ErrorCorrectionLevel.H
                                                }
                                                onChange={() =>
                                                    handleEcLevelChange(
                                                        ErrorCorrectionLevel.H
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </Collapsable>
                            </div>
                            <div className='w-full lg:w-5/12 flex flex-col'>
                                <div className='sticky top-10'>
                                    <div className='p-4 h-min m-auto w-min bg-white rounded-xl'>
                                        <QRCode
                                            id='qrCode'
                                            ref={qrRef}
                                            logoImage={imageSrc}
                                            logoWidth={imageWidth}
                                            logoHeight={
                                                useCustomImageHeight
                                                    ? imageHeight
                                                    : imageWidth
                                            }
                                            removeQrCodeBehindLogo={
                                                removeQrBehindImage
                                            }
                                            logoPaddingStyle={imagePaddingStyle}
                                            logoPadding={imagePadding}
                                            logoOpacity={imageOpacity}
                                            quietZone={quietZone}
                                            eyeRadius={eyeRadius}
                                            ecLevel={ecLevel}
                                            qrStyle={qrStyle}
                                            eyeColor={
                                                useCustomEyeColor
                                                    ? customEyeColor
                                                    : qrCodeColor
                                            }
                                            fgColor={qrCodeColor}
                                            bgColor={qrBgColor}
                                            value={qrContent}
                                            size={qrSize}
                                            style={{
                                                border: "1px solid black",
                                            }}
                                        />
                                    </div>
                                    <div className='mt-4 w-full flex justify-center gap-2'>
                                        <Button
                                            variant='primary'
                                            onClick={() => {
                                                exportImage("png");
                                            }}
                                        >
                                            Download as PNG
                                        </Button>
                                        <Button
                                            variant='primary'
                                            onClick={() => {
                                                exportImage("jpeg");
                                            }}
                                        >
                                            Download as JPeg
                                        </Button>
                                    </div>
                                    <div
                                        className='flex flex-col items-center
                                     justify-center mt-4'
                                    >
                                        <Button
                                            variant='secondary'
                                            onClick={() => {
                                                exportConfig();
                                            }}
                                        >
                                            Export config
                                        </Button>
                                        <p className='mt-8 mb-2 text-sm'>
                                            Load QR Code config
                                        </p>
                                        <input
                                            type='file'
                                            tabIndex={0}
                                            accept='application/json'
                                            className={`file:cursor-pointer text-sm file:border-0 file:bg-neutral-600 file:px-2 file:py-1 file:text-neutral-50 file:rounded-md file:hover:bg-neutral-700 file:focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 file:mr-3`}
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    importConfig(
                                                        e.target.files[0]
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContentWrapper>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;
