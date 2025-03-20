"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const withPrivate = (WrappedComponent: any) => {
  return function PrivateComponent(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const token = Cookies.get("authToken");

    useEffect(() => {
      if (!token) {
        router.push("/signin");
        setLoading(false); // Allow non-authenticated users to render (Middleware will handle redirect)
      }
    }, [token]);

    return <WrappedComponent {...props} />;
  };
};

export default withPrivate;