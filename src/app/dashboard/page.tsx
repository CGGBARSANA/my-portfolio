"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Chat from "@/components/claude-chat-prompt";
import { DarkModeButton } from "@/components/dark-mode-button";
import { GameCard } from "@/components/game-card";
import { projects } from "@/const/project";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CSSProperties } from "react";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/project-card";
import { ActiveView } from "@/const/nav-button";
import { useDebuggerDisabled } from "@/hooks/use-debugger-disabled";
import POST_VISITOR_PAYLOAD from "@/api/Visitor/POST";
function getVisitorId() {
  let id = localStorage.getItem("visitor_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("visitor_id", id);
  }

  return id;
}
export default function Page() {
  const { ready, devToolsOpen } = useDebuggerDisabled();
  // const [data, setData] = useState<LinoflapDashboard[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ready || devToolsOpen) return; // block fetch if devtools open
    async function fetchTable() {
      try {
        setLoading(true);

        const fetchedData = await POST_VISITOR_PAYLOAD();
        console.log(fetchedData);
        // setData(fetchedData.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTable();
  }, [ready, devToolsOpen]);
  const [activeView, setActiveView] = useState<ActiveView>("projects");
  useEffect(() => {
    console.log("Active view changed to:", activeView);
  }, [activeView]);

  const navButtons: { label: string; view: ActiveView }[] = [
    { label: "PROJECTS", view: "projects" },
    { label: "WORK EXPERIENCE", view: "experience" },
    { label: "PLAY SPACESHIP GAME", view: "game" },
  ];
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

      <SidebarInset>
        <header className="flex">
          <div className="flex items-center ">
            {/* <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            /> */}
          </div>
        </header>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div> */}

        <div className="h-screen flex min-h-0 gap-4 p-4 md:p-6">
          <div className="flex-2 min-h-0 overflow-y-auto">
            <div className="w-full  flex flex-col pb-4 pr-2 p-1">
              <Card className="flex-row justify-between p-2">
                <div>
                  {navButtons.map(({ label, view }) => (
                    <Button
                      key={view}
                      className={`mx-1 transition-all duration-200
                        hover:scale-105 hover:shadow-md active:scale-95
                        ${
                          activeView === view
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
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
              </Card>
            </div>
            <div className="transition-opacity duration-300">
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
          <div className="flex-1 min-h-0 overflow-y-auto">
            <Chat />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
