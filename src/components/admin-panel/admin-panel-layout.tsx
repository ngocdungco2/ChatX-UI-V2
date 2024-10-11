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
    <div className="z-10 relative h-dvh ">
      <Sidebar />
      <div className="flex flex-col flex-grow-[9]">
        <main
          // border-[#1e0c31] border-[10px] border-b-0
          className={cn(
            "lg:h-[calc(97dvh_-_theme(spacing.16))] h-[92dvh] transition-[margin-left] ease-in-out duration-300 overflow-auto  lg:rounded-t-3xl  lg:mr-3.5 overflow-y-scroll no-scrollbar ",
            //lg:mt-3.5
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
