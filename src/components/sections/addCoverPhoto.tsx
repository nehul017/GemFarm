'use client';
import UploadIcon from '@/icons/uploadIcon';
import React, { useRef, useState } from 'react';

export default function AddCoverPhoto() {
    const [image, setImage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const handleContainerClick = () => {
        if (!image && inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div>
            <span className="block text-sm text-black font-medium pb-2">
                Add Cover Photo
            </span>

            <div
                className={`h-[140px] border-dashed border border-borderColor rounded-md flex items-center justify-center cursor-pointer relative ${
                    image ? 'p-2' : ''
                }`}
                onClick={handleContainerClick}
            >
                {!image ? (
                    <div>
                        <div className="flex items-center justify-center pb-2">
                            <UploadIcon />
                        </div>
                        <p className="text-sm text-black font-semibold">
                            Click to upload
                        </p>
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        <img
                            src={image}
                            alt="Preview"
                            className="object-cover w-full h-full rounded-md"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded shadow hover:bg-primary"
                        >
                            Remove
                        </button>
                    </div>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>
        </div>
    );
}
