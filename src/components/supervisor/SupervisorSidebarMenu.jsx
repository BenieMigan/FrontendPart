
import { Home, FileText, User, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import PortLogo from "../PortLogo";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Mes stagiaires",
    icon: Home,
    id: "home"
  },
  {
    title: "Demandes d'absence",
    icon: FileText,
    id: "absenceRequests" 
  },
  {
    title: "Profil",
    icon: User,
    id: "profile"
  }
];



export function SupervisorSidebarMenu({ activeItem, onItemChange }) {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4 border-b border-gray-200">
        <PortLogo />
        <div className="mt-2">
          <p className="text-sm font-medium text-port-navy">Espace Encadreur</p>
          <p className="text-xs text-gray-600">Gestion des stagiaires</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeItem === item.id}
                    onClick={() => onItemChange(item.id)}
                    className="w-full justify-start px-4 py-3 text-sm font-medium transition-colors hover:bg-port-blue/10 data-[active=true]:bg-port-blue/20 data-[active=true]:text-port-navy"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Se déconnecter
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
