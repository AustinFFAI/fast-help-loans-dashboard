import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ApplicationRoutes } from "@/enums/applicationRoutesEnum";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Wrench,
  Banknote,
  Home,
  Hammer,
  LayoutDashboard,
} from "lucide-react";
import { NavUser } from "./nav-user";

type AppLink = { href: ApplicationRoutes; label: string; icon: LucideIcon };
type AppSection = { label: string; items: AppLink[] };

const applicationSections: AppSection[] = [
  {
    label: "Commercial",
    items: [
      {
        href: ApplicationRoutes.CommercialAcquisition,
        label: "Acquisition",
        icon: Building2,
      },
      {
        href: ApplicationRoutes.CommercialConstruction,
        label: "Construction",
        icon: Wrench,
      },
      {
        href: ApplicationRoutes.CommercialRefinance,
        label: "Refinance",
        icon: Banknote,
      },
    ],
  },
  {
    label: "Residential",
    items: [
      {
        href: ApplicationRoutes.ResidentialAcquisition,
        label: "Acquisition",
        icon: Home,
      },
      {
        href: ApplicationRoutes.ResidentialConstruction,
        label: "Construction",
        icon: Hammer,
      },
      {
        href: ApplicationRoutes.ResidentialRefinance,
        label: "Refinance",
        icon: Banknote,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-lg font-semibold text-sidebar-foreground tracking-tight">
          Fast Help Loans
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={ApplicationRoutes.Dashboard}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Loan Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {applicationSections.map((section) => (
                <SidebarMenuItem key={section.label}>
                  <SidebarMenuButton
                    aria-disabled
                    className="cursor-default pointer-events-none"
                  >
                    <span className="text-xs font-medium uppercase tracking-wide text-sidebar-foreground/70">
                      {section.label}
                    </span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {section.items.map(({ href, label, icon: Icon }) => (
                      <SidebarMenuSubItem key={href}>
                        <SidebarMenuSubButton asChild>
                          <Link href={href}>
                            <Icon />
                            <span>{label}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "https://i.pravatar.cc/64?img=1",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
