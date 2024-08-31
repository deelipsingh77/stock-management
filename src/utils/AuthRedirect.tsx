"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";

interface AuthRedirectProps {
  children: React.ReactNode;
};

const AuthRedirect = ({ children }: AuthRedirectProps) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  if (user) {
    return (
        <Loading />
    );
  }

  return children;
};

export default AuthRedirect;
