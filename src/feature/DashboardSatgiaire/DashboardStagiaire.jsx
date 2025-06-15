
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DashboardContent  from "@/components/DashboardContent";

const DashboardStagiaire = () => {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <SidebarProvider>
        <AppSidebar 
          activeItem={currentView}
          onItemChange={setCurrentView}
        />
        <main className="flex-1">
          <DashboardContent currentView={currentView} />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardStagiaire;
