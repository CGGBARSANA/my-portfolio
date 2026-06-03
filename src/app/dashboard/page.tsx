import { AppSidebar } from "@/components/app-sidebar"
import { GameCard } from "@/components/game-card"
import { ProfileAvatarCard } from "@/components/profile-avatar-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex">
          <div className="flex items-center gap-2 px-4">

          </div>
        </header>
        <div className="flex gap-4 p-4">

          <div className="flex flex-col gap-4 flex-1">
            <div className="rounded-xl h-full w-full bg-muted/50" />

          </div>
          <div className="flex flex-col gap-4 flex-[2]">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <GameCard />

          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />

      </SidebarInset>
    </SidebarProvider>
  )
}
