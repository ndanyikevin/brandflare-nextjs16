

import Link from "next/link";
import { auth } from "@/lib/auth"; // Better Auth
import { User, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "@/lib/get-session";

export default async function AppNavbar() {
  // Get current user session
  const session = await getServerSession();
  const user = session?.user;

  return (
    <nav className="bg-background border-b sticky top-0 z-10">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        {/* Logo / App Name */}
        <Link href="/" className="font-semibold text-lg">
          <Image src="/logos/BFLogo.png" alt="BrandFlare Woodworks" width={200} height={100} />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link href="/sign-in">
              <Button variant="outline" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  {user.image ? (
                    <AvatarImage src={user.image} />
                  ) : (
                    <AvatarFallback>
                      {user.name?.[0] ?? "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent sideOffset={8}>
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/api/auth/sign-out">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
