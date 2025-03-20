
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent: any) => {
  return function ProtectedComponent(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const token = Cookies.get("authToken");

    useEffect(() => {
      if (!token) {
        router.replace("/signin"); // Redirect if not authenticated
      } else {
        setLoading(false); // Allow rendering
      }
    }, [router, token]);

    // if (loading) return <div className="h-screen flex justify-center items-center text-white">Loading...</div>;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
