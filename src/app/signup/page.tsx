import SignupForm from '@/components/sections/signupForm'
import WelcomeBackBanner from '@/components/sections/welcomeBackBanner'
export default function page() {
  return (
     <div className='bg-white relative h-dvh md:max-w-[375px] md:mx-auto'>
         <WelcomeBackBanner headerText="Welcome!" text="Sign up to continue" />
         <SignupForm />
       </div>
  )
}
