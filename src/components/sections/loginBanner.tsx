import Image from "next/image";
import React from "react";

const LoginBanner = () => {
  return (
    <div className="h-full relative">
      <Image
        src="/assets/images/login-banner.png" // ✅ Ensure the image is in `public/assets/images/`
        alt="Login Image"
        fill // ✅ Replaces `layout="fill"`
        className="object-cover rounded-b-[40px]" // ✅ Ensures the image covers the entire container
        priority // ✅ Loads image faster
      />
    </div>
  );
};

export default LoginBanner;
