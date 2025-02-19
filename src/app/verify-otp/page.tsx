import VerifyOTPForm from "@/components/sections/verifyOTPForm";
import WelcomeBackBanner from "@/components/sections/welcomeBackBanner";

export default function page() {
  return (
    <div className="bg-white relative h-screen md:max-w-[375px] md:mx-auto">
      <WelcomeBackBanner headerText="OTP Verification" text="" />
      <VerifyOTPForm />
    </div>
  );
}
