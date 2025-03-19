"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/common/button";
import Input from "@/components/common/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchUserProfile, updateUserProfile } from "../redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileSchema } from "../utils/validations/authValidation";

const EditIcon = "/assets/icons/edit.svg";
const ProfileIcon = "/assets/images/Ty1.png";

interface ProfileFormData {
  userName: string;
  email: string;
}
export default function UpdateProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Use react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(updateProfileSchema), // Connect Yup validation
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Set form default values when user data is available
  useEffect(() => {
    if (user) {
      setValue("userName", user.userName || "");
      setValue("email", user.email || "");
      setPreviewImage(user.profileImage);     
      setInitialLoading(false);
    }
  }, [user, setValue]);

  // Handle Image Selection
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
  
      // Validate file type
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        console.log('file', file)
        toast.error("Only JPG, JPEG, PNG, GIF, and WEBP images are allowed.");
        return;
      }
  
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("Image must be less than 5MB.");
        return;
      }
  
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (initialLoading)
    return (
      <div className="flex justify-center items-center h-dvh">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );

  // Handle form submission
  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("userName", data.userName);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    dispatch(
      updateUserProfile({
        id: user.id,
        userName: data.userName.trim(),
        email: data.email,
        profileImage: profileImage || undefined,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Profile Updated Successfully!");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="pt-3 px-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-[100px] relative h-[100px] mx-auto">
        <label htmlFor="profileImageUpload" className="cursor-pointer">
          <img
            className="w-full h-full rounded-full block object-cover"
            src={
              previewImage ||
              ProfileIcon
            }
            alt="Profile"
          />
          <input
            type="file"
            id="profileImageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        <div className="absolute bottom-0 right-0">
          <img
            src={EditIcon}
            alt="EditIcon"
            className="block cursor-pointer max-w-7"
          />
        </div>
      </div>
      <div className="pt-2.5 pb-[30px]">
        <h2 className="text-base font-semibold text-black200 text-center">
          {user?.userName || "User Name"}
        </h2>
        <p className="text-[10px] leading-4 text-gray600 block text-center">
          {user?.email || "user@example.com"}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            inputClass="bg-[#FAFAFA]"
            label="Name"
            placeholder="Enter your name"
            {...register("userName", {
              onChange: (e) => setValue("userName", e.target.value),
            })}
            error={errors.userName?.message}
          />
          <div className="py-5">
            <Input
              inputClass="bg-[#FAFAFA]"
              label="Email"
              readOnly
              placeholder="Enter your email"
              {...register("email", {
                onChange: (e) =>
                  setValue("email", e.target.value.trim().toLowerCase()),
              })}
              error={errors.email?.message} // Pass the error for email
            />
          </div>
        </div>
        <div>
          <Button green text="Save Changes" type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center">
                Updating...
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
