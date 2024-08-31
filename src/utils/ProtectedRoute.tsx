"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [user, router]);

  return user ? children : null;
};

export default ProtectedRoute;
