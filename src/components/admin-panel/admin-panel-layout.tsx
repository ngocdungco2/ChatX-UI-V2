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
    <>
      <Sidebar />
      <main
        className={cn(
          "h-[calc(100vh_-_theme(spacing.20))] transition-[margin-left] ease-in-out duration-300 overflow-auto bg-cover bg-logoChat  rounded-t-3xl mr-2  ",
          // @ts-ignore
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72 "
        )}
      >
        {children}
      </main>

      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300 mr-2 ",
          // @ts-ignore
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
