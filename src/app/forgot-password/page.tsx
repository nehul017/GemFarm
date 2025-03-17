import Header from "@/components/layout/header";
import ForgotPasswordForm from "@/components/sections/forgotPasswordForm";
import WelcomeBackBanner from "@/components/sections/welcomeBackBanner";

export default function page() {
  return (
    <div className="bg-white relative h-dvh md:max-w-[375px] md:mx-auto">
      <Header header="" isNotificationIcon={false} isOnlyBackButton={true} />
      <WelcomeBackBanner headerText="Reset Password" text="" />
      <ForgotPasswordForm />
    </div>
  );
}
