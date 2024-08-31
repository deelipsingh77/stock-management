"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="grid w-full max-w-[900px] grid-cols-1 rounded-lg border bg-background shadow-sm md:grid-cols-2">
      <div className="hidden rounded-l-lg bg-muted md:block">
        <Image
          src="/placeholder.svg"
          alt="Company Logo"
          width={450}
          height={600}
          className="h-full w-full rounded-l-lg object-cover"
          priority
        />
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[380px] space-y-6">
          <div className="space-y-2 text-center animate-fade-in">
            <h1 className="text-3xl font-bold animate-fade-in-up">Login</h1>
            <p className="text-muted-foreground animate-fade-in-up">
              Enter your username and password to access your account.
            </p>
          </div>
          <form className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-sm font-medium underline underline-offset-4 hover:text-primary animate-fade-in-up"
                  prefetch={false}
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full animate-fade-in-up"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
