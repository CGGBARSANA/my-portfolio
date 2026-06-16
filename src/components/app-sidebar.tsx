"use client"
import * as React from "react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon } from "lucide-react"
import { ProfileAvatarCard } from "./profile-avatar-card"
import { FaFacebook, FaGithub, FaGithubAlt, FaKaggle, FaLinkedin } from "react-icons/fa6"
import { SkillLogoCard } from "./skill-logo-card"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Github",
      url: "https://github.com/CGGBARSANA",
      icon: (
        <FaGithub />
      ),
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/christian-gerome-barsana-97a917265/",
      icon: (
        <FaLinkedin />
      ),
    },

    {
      title: "Facebook",
      url: "https://www.facebook.com/mcggbarsana/",
      icon: (
        <FaFacebook />
      ),
    },
    {
      title: "Kaggle",
      url: "https://www.kaggle.com/christiangerome",
      icon: (
        <FaKaggle />
      ),
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
}

const Planguages = [
  // ======================
  // Programming Languages
  // ======================
  { src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" },
]
const Development = [
  // ======================
  // Web Development
  // ======================
  { src: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
]
const Backend = [
  // Backend
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" },
]
const MobileDevelopment = [
  // ======================
  // Mobile Development
  // ======================
  { src: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png" },
  { src: "https://reactnative.dev/img/header_logo.svg" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png" },
  { src: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" },

]
const DatabaseBackend = [
  // ======================
  // Database & Backend Services
  // ======================
  { src: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
  { src: "https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png" },

]
const VersionControl = [
  // ======================
  // Tools / Version Control
  // ======================
  { src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg" },
  { src: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
  { src: "https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png" },

]
const CloudDevOps = [
  // ======================
  // Cloud & DevOps
  // ======================
  { src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg" },
]

const MachineLearningDataScience = [
  // ======================
  // Machine Learning & Data Science
  // ======================
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Pytorch_logo.png" },

]

const ERP = [
  // ======================
  // ERP
  // ======================
  { src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Odoo_logo.svg" },
];



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>

      <SidebarContent>
        <div className="pb-20">
          <ProfileAvatarCard />
        </div>
        <SidebarGroupLabel>Platforms</SidebarGroupLabel>
        <NavMain items={data.navMain} />
        <SidebarGroupLabel>Programming Languages</SidebarGroupLabel>
        <SkillLogoCard datass={Planguages} />
        <SidebarGroupLabel>Web Development</SidebarGroupLabel>
        <SkillLogoCard datass={Development} />
        <SidebarGroupLabel>Backend</SidebarGroupLabel>
        <SkillLogoCard datass={Backend} />
        <SidebarGroupLabel>Mobile Development</SidebarGroupLabel>
        <SkillLogoCard datass={MobileDevelopment} />
        <SidebarGroupLabel>Database Backend</SidebarGroupLabel>
        <SkillLogoCard datass={DatabaseBackend} />
        <SidebarGroupLabel>Version Control</SidebarGroupLabel>
        <SkillLogoCard datass={VersionControl} />
        <SidebarGroupLabel>Cloud & DevOps</SidebarGroupLabel>
        <SkillLogoCard datass={CloudDevOps} />
        <SidebarGroupLabel>Machine Learning & Data Science</SidebarGroupLabel>
        <SkillLogoCard datass={MachineLearningDataScience} />
        <SidebarGroupLabel>ERP</SidebarGroupLabel>
        <SkillLogoCard datass={ERP} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}
