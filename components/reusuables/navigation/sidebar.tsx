import { Home, Settings, Bell, Users, ChartNoAxesCombined, NotebookText, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Patients",
    url: "/patients",
    icon: Users,
  },
  {
    title: "Practitioners",
    url: "/practitioners",
    icon: Users,
  },
  {
    title: "Notification",
    url: "#",
    icon: Bell,
  },
  {
    title: "Insight",
    url: "#",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Report",
    url: "#",
    icon: NotebookText,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-8 border-b text-md ">
            <User size={30} />
            <span className="ml-2"> Dr. Alex</span>

          </SidebarGroupLabel>

          <SidebarGroupContent className="py-8">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-4">
                  <SidebarMenuButton asChild>
                    <Link href={item.url} >
                      <item.icon className="h-12 w-12" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
