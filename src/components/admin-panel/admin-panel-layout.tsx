"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Footer } from "@/components/admin-panel/footer";
import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <div className="z-10 relative">
      <Sidebar />
      <div className="">
        <main
          // border-[#1e0c31] border-[10px] border-b-0
          className={cn(
            "lg:h-[calc(97vh_-_theme(spacing.20))] h-[90vh] transition-[margin-left] ease-in-out duration-300 overflow-auto  bg-gradient-to-br from-pink-100 via-slate-100 to-blue-100  lg:rounded-t-3xl lg:mt-3.5 lg:mr-3.5 overflow-y-scroll no-scrollbar",
            // @ts-ignore
            sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-[260px] "
          )}
        >
          {children}
        </main>
      </div>

      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300 lg:mr-3.5 ",
          // @ts-ignore
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-[260px]"
        )}
      >
        <Footer />
      </footer>
    </div>
  );
}
