"use client";

import { redirect, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ToggleButton";
import { LogOut, LogOutIcon } from "lucide-react";
import { signOut } from "better-auth/api";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export default function NavbarClient({ user }: { user: any }) {
  const pathname = usePathname();

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/testimonial", label: "Testimonial" },
  ];

  // Add dashboard link *only* if admin
  const adminLinks = user?.role === "ADMIN"
    ? [{ href: "/dashboard", label: "Dashboard" }]
    : [];

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" size="icon" variant="ghost">
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                >
                  <path className="-translate-y-[7px] transition-all" d="M4 12L20 12" />
                  <path className="transition-all" d="M4 12H20" />
                  <path className="translate-y-[7px] transition-all" d="M4 12H20" />
                </svg>
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {[...navigationLinks, ...adminLinks].map((link) => (
                    <NavigationMenuItem key={link.href} className="w-full">
                      <NavigationMenuLink
                        active={pathname === link.href}
                        className="py-1.5"
                        href={link.href}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo + Desktop Nav */}
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src="/no_bg.png"
                alt="Brandflare Logo"
                width={200}
                height={120}
              />
            </Link>

            {/* DESKTOP NAV */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {[...navigationLinks, ...adminLinks].map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      active={pathname === link.href}
                      className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                      href={link.href}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {!user ? (
            <>
              <Button asChild className="text-sm" size="sm" variant="ghost">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="text-sm" size="sm">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          ) : (
            <SignOutItem />
          )}
        </div>
      </div>
    </header>
  );
}

function SignOutItem() {
  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "Something went wrong");
    } else {
      toast.success("Signed out successfully");
      redirect("/sign-in");
    }
  }

  return (
    <Button onClick={handleSignOut}>
      <LogOutIcon className="size-4" /> <span>Sign out</span>
    </Button>
  );
}