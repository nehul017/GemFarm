"use client";
import UploadIcon from "@/icons/uploadIcon";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store"; // adjust path as needed
import { uploadImage } from "@/redux/slices/uploadSlice"; // adjust path
import { toast, ToastContainer } from "react-toastify";

interface AddCoverPhotoProps {
  setImageURL: (url: string) => void;
  error?: string;
  required?: boolean;
}
export default function AddCoverPhoto({
  setImageURL,
  error,
  required = false,
}: AddCoverPhotoProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
  ];
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const { fileUrl, loading } = useSelector((state: RootState) => state.upload);

  useEffect(() => {
    if (fileUrl) {
      setImageURL(fileUrl);
    }
  }, [fileUrl]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast.error("Only JPG, JPEG, PNG, GIF, and WEBP images are allowed.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image must be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload
      const formData = new FormData();
      formData.append("image", file);
      dispatch(uploadImage(formData));
    }
  };

  const removeImage = () => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleContainerClick = () => {
    if (!image && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <span className="block text-sm text-black font-medium pb-2">
        Add Cover Photo
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>

      <div
        className={`h-[140px] border-dashed border border-borderColor rounded-md flex items-center justify-center cursor-pointer relative ${
          image ? "p-2" : ""
        }  ${error ? "border-red-500" : "border-borderColor"}`}
        onClick={handleContainerClick}
      >
        {!image ? (
          <div>
            <div className="flex items-center justify-center pb-2">
              <UploadIcon />
            </div>
            <p className="text-sm text-black font-semibold">
              {loading ? "Uploading..." : "Click to upload"}
            </p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={image}
              alt="Preview"
              className={`object-cover w-full h-full rounded-md ${
                loading ? "opacity-60" : ""
              }`}
            />
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded-md">
                <div className="loader w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}
            {!loading && (
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded shadow hover:bg-primary"
              >
                Remove
              </button>
            )}
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
      {error && (
        <p className="text-red-500 text-sm mt-1">Upload Error: {error}</p>
      )}
    </div>
  );
}
