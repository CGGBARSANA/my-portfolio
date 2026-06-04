import { AppSidebar } from "@/components/app-sidebar"
import Chat from "@/components/claude-chat-prompt"
import { GameCard } from "@/components/game-card"
import { ProfileAvatarCard } from "@/components/profile-avatar-card"
import ProjectCard from "@/components/project-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { CSSProperties } from "react"

export default function Page() {
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
        {
        /* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div> */
        }


<div className="h-screen flex min-h-0 gap-4 p-4 md:p-6">
  <div className="flex-2 min-h-0 overflow-y-auto">
    <div className="w-full  flex flex-col pb-4 pr-2" ><Card><CardTitle className="px-4">Project</CardTitle></Card></div>
    <ProjectCard />
    <ProjectCard />
    <ProjectCard />
    <ProjectCard />
  </div>
  <div className="flex-1 min-h-0 overflow-y-auto">
   
    <Chat />
  </div>
</div>

        {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}

      </SidebarInset>
    </SidebarProvider>
  )
}
