"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Chat from "@/components/claude-chat-prompt";
import { DarkModeButton } from "@/components/dark-mode-button";
import { GameCard } from "@/components/game-card";
import { projects } from "@/const/project";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { CSSProperties } from "react";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/project-card";
import { ActiveView, navButtons } from "@/const/nav-button";
import { useDebuggerDisabled } from "@/hooks/use-debugger-disabled";
import POST_VISITOR_PAYLOAD from "@/api/Visitor/POST";
import { Separator } from "@base-ui/react";
// import { SiteHeader } from "@/components/site-header";
// function getVisitorId() {
//   let id = localStorage.getItem("visitor_id");

//   if (!id) {
//     id = crypto.randomUUID();
//     localStorage.setItem("visitor_id", id);
//   }

//   return id;
// }
export async function fetchTable(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  url?: string
) {
  try {
    setLoading(true);

    const fetchedData = await POST_VISITOR_PAYLOAD(url);
    console.log(fetchedData);
    // setData(fetchedData.data);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    setLoading(false);
  }
}

export default function Page() {
  const { ready, devToolsOpen } = useDebuggerDisabled();
  // const [data, setData] = useState<LinoflapDashboard[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ready || devToolsOpen) return; // block fetch if devtools open


    fetchTable(setLoading);
  }, [ready, devToolsOpen]);
  const [activeView, setActiveView] = useState<ActiveView>("chat");

  useEffect(() => {
    fetchTable(setLoading, activeView)
    // const fetchedData = await POST_VISITOR_PAYLOAD("chat");
    console.log("Active view changed to:", activeView);
  }, [activeView]);


return (
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <div className="flex flex-col h-svh">  {/* h-svh is safer than h-screen in sidebar layouts */}
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 h-4 data-vertical:self-auto"
            />
            <div className="flex flex-1 flex-row items-center justify-between p-2">
              <div>
                {navButtons.map(({ label, view }) => (
                  <Button
                    key={view}
                    className={`mx-1 text-xs transition-all duration-200
                    hover:scale-105 hover:shadow-md active:scale-95
                ${
                  activeView === view
                    ? "bg-(--button-active) text-primary-foreground"
                    : "hover:primary hover:primary-foreground"
                }`}
                    onClick={() => setActiveView(view)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <div>
                <DarkModeButton />
              </div>
            </div>
          </div>
        </header>

        {/* flex-1 fills remaining height after header; min-h-0 allows it to shrink */}
        <div className="flex-1 flex min-h-0 p-2 gap-2 ">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 flex flex-col min-h-0 overflow-auto transition-opacity duration-300 p-4">
              {activeView === "chat" && <Chat />}
              {activeView === "game" && <GameCard />}
              {activeView === "projects" && <ProjectCard items={projects} />}
              {activeView === "experience" && (
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-muted-foreground">
                    Work experience coming soon...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
);
}
