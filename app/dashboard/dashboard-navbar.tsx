import { getServerSession } from "@/lib/get-session";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { UserDropdown } from "@/components/user-dropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";


export async function Navbar() {
  const session = await getServerSession();
  const user = session?.user;

  if (user?.role !== "ADMIN") return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-3">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
