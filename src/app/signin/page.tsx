"use client"; // 👈 Add this at the top
import SigninForm from "@/components/sections/signinForm";
import WelcomeBackBanner from "@/components/sections/welcomeBackBanner";
import withPrivate from "../withPrivate";

const page = () => {
  return (
    <div className="bg-white relative h-dvh md:max-w-[375px] md:mx-auto">
      <WelcomeBackBanner
        headerText="Welcome Back!"
        text="Sign in to continue"
      />
      <SigninForm />
    </div>
  );
};

export default withPrivate(page);
