"use client"; 

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Inter, Paytone_One } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/Providers";

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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    if (!token && !user) {
      
      router.push("/signin"); // Redirect to signin if token and user do not exist
    }
  }, [router]);
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${paytoneOne.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
