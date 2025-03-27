"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Inter, Paytone_One } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/Providers";
import Footer from "@/components/layout/footer";
import Cookies from "js-cookie";

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
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = Cookies.get("authToken");
  //   const user = Cookies.get("user");

  //   if (token && user && (pathname === "/signin" || pathname === "/signup")) {
  //     router.replace("/home"); // Prevent flickering
  //   } else if (!token) {
  //   } else {
  //     setLoading(false); // Show page only after auth check
  //   }
  // }, [router, pathname]);

  // Hide footer on signin and signup pages
  const hideFooter =
    pathname === "/" ||
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/verify-otp";

    useEffect(() => {
      const handlePopState = (event: PopStateEvent) => {
        if (pathname === "/signin" || pathname === "/signup") {
          event.preventDefault();
          window.history.pushState(null, "", window.location.href);
        }
      };
  
      if (pathname === "/signin" || pathname === "/signup") {
        // Push the current state to prevent back navigation
        window.history.pushState(null, "", window.location.href);
  
        // Add popstate listener for back/forward navigation
        window.addEventListener("popstate", handlePopState);
      }
  
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A3732" />
      </head>
      <body className={`${inter.variable} ${paytoneOne.variable} antialiased`}>
        <Providers>
          {/* {!hideFooter && <Footer />} */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
