import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import Image from "next/image";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-dvh -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 shadow-lg bg-[#1e0c31]",
        sidebar?.isOpen === false ? "w-[90px]" : "w-[260px]"
      )}
    >
      {/* <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} /> */}
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            {!sidebar.isOpen && (
              <Image
                src="/logo.png"
                alt="logo"
                height={20}
                width={30}
                className="mx-1"
              />
            )}
            <h1
              className={cn(
                "font-bold text-2xl whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 flex",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              {/* Chat */}

              <Image
                src="/logwhite.svg"
                alt="logo"
                height={40}
                width={140}
                className="mt-5 w-[150px] h-auto"
                priority={true}
              />
            </h1>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
