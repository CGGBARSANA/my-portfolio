import { CSSProperties, ReactNode } from "react";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SiteHeader } from "@/components/headers/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Breadcrumb = { label: string };

interface AppPageShellProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  children: ReactNode;
  insetClassName?: string;
}

export function AppPageShell({
  title,
  breadcrumbs,
  children,
  insetClassName = "bg-card",
}: AppPageShellProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className={`flex h-screen flex-col overflow-hidden ${insetClassName}`}>
        <SiteHeader title={title} breadcrumbs={breadcrumbs} />
        <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}