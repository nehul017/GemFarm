import Header from "@/components/layout/header";
import VerifyOTPForm from "@/components/sections/verifyOTPForm";
import WelcomeBackBanner from "@/components/sections/welcomeBackBanner";

export default function page() {
  return (
    <div className="bg-white relative h-dvh md:max-w-[375px] md:mx-auto">
      <Header header="" isNotificationIcon={false} isOnlyBackButton={true} />
      <WelcomeBackBanner headerText="OTP Verification" text="" />
      <VerifyOTPForm />
    </div>
  );
}
