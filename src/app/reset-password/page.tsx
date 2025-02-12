import ResetPasswordForm from "@/components/sections/resetPasswordForm";
import WelcomeBackBanner from "@/components/sections/welcomeBackBanner";

export default function page() {
  return (
    <div className="bg-white relative h-screen md:max-w-[375px] md:mx-auto">
      <WelcomeBackBanner headerText="Welcome!" text="Reset Password" />
      <ResetPasswordForm />
    </div>
  );
}
