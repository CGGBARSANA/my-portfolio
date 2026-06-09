'use client'
import { AppSidebar } from "@/components/app-sidebar"
import Chat from "@/components/claude-chat-prompt"
import { DarkModeButton } from "@/components/dark-mode-button"
import { GameCard } from "@/components/game-card"
import ProjectCard, { ProjectItem } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { CSSProperties } from "react"
import { useState, useEffect } from "react";

type ActiveView = "projects" | "experience" | "game";
export default function Page() {
  const [activeView, setActiveView] = useState<ActiveView>("projects")
    useEffect(() => {
    console.log("Active view changed to:", activeView);
  }, [activeView]);
  const projects: ProjectItem[] = [
    {
      title: "Green Market – Capstone Project",
      image: "/green-market.jpg",
      imageAlt: "Green Market App",
      badges: ["Flutter", "Dart", "Firebase", "Android Studio"],
      description:
        "A full-stack mobile and web capstone project designed and developed using Flutter and Firebase.",
      highlights: [
        "Designed UI/UX using Figma and implemented using Flutter",
        "Built real-time chat system using Firebase",
        "Developed cross-platform mobile application",
      ],
    },
    {
      title: "IM.AI Tablet Application",
      image: "/im-ai.jpg",
      imageAlt: "IM.AI Tablet App",
      badges: ["Python", "PyQt", "SQL Server", "TensorFlow", "MongoDB"],
      description:
        "Tablet-based application integrated with payment systems and machine learning for product classification.",
      highlights: [
        "Built tablet UI using PyQt and Python",
        "Integrated PayMaya/PayPay payment systems",
        "Developed ML model for product classification",
      ],
    },
    {
      title: "UGC Sniper",
      image: "/ugc-sniper.jpg",
      imageAlt: "UGC Sniper Bot",
      badges: ["Python", "Flask", "API"],
      description:
        "Automation tool designed to purchase limited and in-demand Roblox virtual items.",
      highlights: [
        "Integrated Roblox API for automated purchasing",
        "Optimized system for real-time item acquisition",
        "Built high-speed backend automation with Flask",
      ],
    },
    {
      title: "K-12 Student Enrollment System",
      image: "/k12-enrollment.jpg",
      imageAlt: "Enrollment System",
      badges: ["PHP", "MySQL"],
      description:
        "Full-stack enrollment system for managing student records, classes, and analytics.",
      highlights: [
        "Designed relational database schema in MySQL",
        "Built admin, teacher, and student interfaces",
        "Implemented enrollment and scheduling system",
        "Created analytics dashboard with charts",
      ],
    },
    {
      title: "Computer Shop POS System",
      image: "/pos-system.jpg",
      imageAlt: "POS System",
      badges: ["Django", "Python", "SQLite"],
      description:
        "Point-of-sale system for managing sales, inventory, and financial reporting.",
      highlights: [
        "Built transaction and billing system",
        "Implemented inventory management features",
        "Added role-based authentication",
        "Created sales and financial reporting module",
      ],
    },
    {
      title: "EmotiCom (AAC) System",
      image: "/emoticom.jpg",
      imageAlt: "EmotiCom AAC System",
      badges: ["Python", "TensorFlow"],
      description:
        "AI-powered AAC system designed to assist users with communication challenges.",
      highlights: [
        "Developed emotion recognition ML model",
        "Built assistive communication interface",
        "Optimized for real-time interaction",
      ],
    },
    {
      title: "MDL Man (Flappy Bird)",
      image: "/mdl-man.jpg",
      imageAlt: "Flappy Bird Computer Vision Game",
      badges: ["Unity", "Python", "Computer Vision"],
      description:
        "Flappy Bird-inspired game controlled using head tracking and computer vision.",
      highlights: [
        "Implemented head movement controls",
        "Integrated real-time computer vision tracking",
        "Optimized gameplay performance",
      ],
    },
    {
      title: "REALTI",
      images: ["https://i.ibb.co/fzXCXtNn/realti-start.png","https://i.ibb.co/1fTrGB0D/option-realti.png","https://i.ibb.co/NdD7SBSz/introduction-realti.png"],
      imageAlt: "Computer Learning Game",
      badges: ["HTML", "CSS", "JavaScript"],
      webhref:
        "https://fabulous-quokka-47dab3.netlify.app/",
      description:
        "Interactive educational web application for learning computer hardware assembly.",
      highlights: [
        "Built drag-and-drop interactive learning system",
        "Designed computer assembly simulation game",
        "Improved engagement through gamification",
      ],
    },
    {
      title: "RENT(A)CAR",
      images: ["https://i.ibb.co/SwF1Q47G/main.png","https://i.ibb.co/5xTChpG5/rental.png",],
      imageAlt: "Car Rental System",
      badges: ["Java", "MySQL"],
      description:
        "Car rental management system for booking, tracking, and managing rentals.",
      highlights: [
        "Built booking and rental management system",
        "Designed secure database structure",
        "Implemented user-friendly UI for operations",
      ],
    },
  ];

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
            <div className="w-full  flex flex-col pb-4 pr-2" >
              <Card className="flex-row justify-between px-2">
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
            
                  <p className="text-muted-foreground">Work experience coming soon...</p>
                </div>
              )}
            </div>
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
