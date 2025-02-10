import SignupForm from '@/components/sections/signupForm'
import WelcomeBackBanner from '@/components/sections/welcomeBackBanner'
export default function page() {
  return (
     <div className='bg-white relative h-screen md:max-w-[375px] md:mx-auto'>
         <WelcomeBackBanner />
         <SignupForm />
       </div>
  )
}
