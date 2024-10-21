"use client";

import * as React from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Menubar className="border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button
            className="lg:hover:bg-background/50 size-12 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
            variant="outline"
            size="icon"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </MenubarTrigger>
        <MenubarContent align="start" alignOffset={-10} className="w-[200px]">
          <MenubarItem
            className="lg:hover:text-primary cursor-pointer"
            onClick={() => setTheme("light")}
          >
            Light
          </MenubarItem>
          <MenubarItem
            className="lg:hover:text-primary cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            Dark
          </MenubarItem>
          <MenubarItem
            className="lg:hover:text-primary cursor-pointer"
            onClick={() => setTheme("system")}
          >
            System
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
