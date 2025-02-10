import Button from "@/components/common/button";
import LoginBanner from "@/components/sections/loginBanner";
import Link from "next/link";
const Vector = '/assets/icons/vec.png';
export default function Home() {
  return (
    <div className="bg-primary h-screen md:max-w-[375px] md:mx-auto">
      <div className="h-[381px]">
        <LoginBanner/>
      </div>
      <div className="h-[calc(100vh-381px)] relative flex items-center">
        <div className="absolute left-[50%] top-[-40px] translate-x-[-50%]">
          <img src={Vector} alt="Vector"/>
        </div>
        <div className="px-5">
          <h1 className="text-[40px] leading-[50px] text-white mb-8 font-heading text-center">
          Manage Your GemFarm
          </h1>
          <p className="text-white opacity-[.55] text-sm font-medium text-center mb-20">
            Lorem Ipsum is simply dummy text of the printing and 
            typesetting industry
          </p>
            <Link href='/signin'>
              <Button text="Get Started"/>
            </Link>
        </div>
      </div>
    </div>
  );
}
