"use client";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { ReactNode } from "react";
import { Sun, Moon, UserCircle, Menu, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import { useTheme } from "next-themes";
import React from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation"; // Import usePathname
import { navItems } from "@/utils/Routes"; // Import your routes
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [desktopSidebarOpen, setDesktopSidebarOpen] = React.useState(true); // State for desktop sidebar
  const [mounted, setMounted] = React.useState(false);
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const pathname = usePathname(); // Get the current path

  const generateRandomAvatarUrl = () => {
    const randomString = Math.random().toString(36).substring(7); // Generate a random string
    return `https://api.multiavatar.com/${randomString}.svg`;
  };

  React.useEffect(() => {
    setMounted(true);
    const url = generateRandomAvatarUrl();
    console.log(url);

    setAvatarUrl(url);
  }, []);

  if (!mounted) {
    return null;
  }

  // Function to get the page title based on the current path
  const getPageTitle = () => {
    for (const item of navItems) {
      if (item.href === pathname) {
        return item.title;
      }
      if (item.submenu) {
        for (const subItem of item.submenu) {
          if (subItem.href === pathname) {
            return subItem.title;
          }
        }
      }
    }
    return "Dashboard"; // Default title
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Desktop Sidebar (Hidden on mobile) */}
        <div className="hidden lg:block">
          <Sidebar
            sidebarOpen={desktopSidebarOpen}
            setSidebarOpen={setDesktopSidebarOpen}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "lg:hidden",
                      theme === "dark" && "text-white"
                    )}
                    aria-label="Open sidebar"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  {/* Mobile Sidebar */}
                  <Sidebar
                    sidebarOpen={true} // Always open in mobile
                    setSidebarOpen={() => {}} // No-op function for mobile
                  />
                </SheetContent>
              </Sheet>
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white ml-4">
                {getPageTitle()} {/* Dynamically display the page title */}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-800 hover:dark:text-gray-800"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="rounded-full h-8 w-8 overflow-hidden cursor-pointer">
                    <Image
                      src={avatarUrl}
                      alt="User Avatar"
                      className="h-full w-full rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
