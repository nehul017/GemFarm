"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Inter, Paytone_One } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/Providers";
import Footer from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const paytoneOne = Paytone_One({
  variable: "--font-paytone",
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const user = sessionStorage.getItem("user");

    if (!token && !user) {
      router.push("/"); // Redirect to signin if token and user do not exist
    } else {
      router.push("/home");
    }
  }, [router]);
  // Hide footer on signin and signup pages
  const hideFooter =
    pathname === "/" ||
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/verify-otp";

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${paytoneOne.variable} antialiased`}>
        <Providers>
          {!hideFooter && <Footer />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
