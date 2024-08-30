"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronLeft, Menu } from "lucide-react"; // Added Menu icon import
import { navItems } from "@/utils/Routes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out h-full",
        sidebarOpen ? "w-64" : "w-16",
        "lg:h-screen"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Desktop Sidebar Toggle */}
        <div className="hidden lg:flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          {sidebarOpen && (
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              Logo
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </Button>
        </div>

        {/* Mobile Sidebar Toggle */}
        <div className={cn("lg:hidden", sidebarOpen ? "block" : "hidden")}>
          <div className="flex items-center justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" /> 
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-2 space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  sidebarOpen ? (
                    <Accordion
                      type="single"
                      collapsible
                      className="border-none"
                    >
                      <AccordionItem
                        value={item.title}
                        className="border-none"
                      >
                        <AccordionTrigger className="flex items-center py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                          <item.icon className="h-5 w-5 mr-3" />
                          <span className="flex-1 text-left">{item.title}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="pl-4 space-y-2">
                            {item.submenu.map((subitem, subindex) => (
                              <li key={subindex}>
                                <Link
                                  href={subitem.href}
                                  className={cn(
                                    "flex items-center py-2 px-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",
                                    pathname === subitem.href &&
                                      "bg-gray-200 dark:bg-gray-700"
                                  )}
                                >
                                  <subitem.icon className="h-4 w-4 mr-3" />
                                  {subitem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full flex justify-center py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                          <item.icon className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <ul className="space-y-2">
                          {item.submenu.map((subitem, subindex) => (
                            <li key={subindex}>
                              <Link
                                href={subitem.href}
                                className={cn(
                                  "flex items-center py-2 px-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",
                                  pathname === subitem.href &&
                                    "bg-gray-200 dark:bg-gray-700"
                                )}
                              >
                                <subitem.icon className="h-4 w-4 mr-3" />
                                {subitem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </PopoverContent>
                    </Popover>
                  )
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md",
                            pathname === item.href &&
                              "bg-gray-200 dark:bg-gray-700",
                            !sidebarOpen && "justify-center"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {sidebarOpen && (
                            <span className="ml-3 flex-1">{item.title}</span>
                          )}
                        </Link>
                      </TooltipTrigger>
                      {!sidebarOpen && (
                        <TooltipContent
                          side="right"
                          className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
