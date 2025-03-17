import Header from "@/components/layout/header";
import ResetPasswordForm from "@/components/sections/resetPasswordForm";
import WelcomeBackBanner from "@/components/sections/welcomeBackBanner";

export default function page() {
  return (
    <div className="bg-white relative h-dvh md:max-w-[375px] md:mx-auto">
      <Header header="" isNotificationIcon={false} isOnlyBackButton={true} />
      <WelcomeBackBanner headerText="Set Reset Password" text="" />
      <ResetPasswordForm />
    </div>
  );
}
