"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button";
import LoginBanner from "@/components/sections/loginBanner";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

const Vector = "/assets/icons/vec2.svg";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (token) {
      router.push("/home"); // Redirect to home/dashboard if logged in
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-primary h-dvh md:max-w-[375px] md:mx-auto">
      <div className="h-[360px]">
        <LoginBanner />
      </div>
      <div className="h-[calc(100vh-381px)] relative flex items-center">
        <div className="absolute left-[50%] top-[-40px] translate-x-[-50%]">
          <Image src={Vector} alt="Vector" width={100} height={100} priority />
        </div>
        <div className="px-5">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.07)_5%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.07)_5%)] bg-[length:50px_50px] opacity-20 pointer-events-none"></div>

          <h1 className="text-[40px] leading-[50px] text-white mb-5 font-heading text-center">
            Manage Your GemFarm
          </h1>
          <p className="text-white opacity-[.55] text-sm font-medium text-center mb-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </p>
          <Link href="/signin">
            <Button text="Get Started" />
          </Link>
        </div>
      </div>
    </div>
  );
}
