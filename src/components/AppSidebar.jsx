
import { Home, FileText, Eye, Upload, FolderOpen, User, LogOut, Settings } from "lucide-react";
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
import PortLogo from "./PortLogo";
import { Button } from "@/components/ui/button";
import logoPort from '@/assets/images/logo-port.png';


const menuItems = [
  {
    title: "Accueil",
    icon: Home,
    id: "home" 
  },
  {
    title: "Faire une demande",
    icon: FileText,
    id: "request" 
  },
  {
    title: "Gestion des demandes",
    icon: Settings,
    id: "requestManagement" 
  },
  {
    title: "Suivi de ma demande",
    icon: Eye,
    id: "tracking" 
  },
  {
    title: "Téléverser assurance",
    icon: Upload,
    id: "insurance" 
  },
  {
    title: "Mes documents",
    icon: FolderOpen,
    id: "documents"
  },
  {
    title: "Profil",
    icon: User,
    id: "profile"
  }
];


export function AppSidebar({ activeItem, onItemChange }) {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3 animate-fade-in">
            <img src={logoPort} alt="Logo Port Autonome" className="h-16 w-full rounded-sm" />
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
