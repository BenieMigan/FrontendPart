import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SupervisorSidebarMenu } from "@/components/supervisor/SupervisorSidebarMenu";
import { SupervisorDashboardContent } from "@/components/supervisor/SupervisorDashboardContent";


const SupervisorDashboard = () => {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <SidebarProvider>
        <SupervisorSidebarMenu 
          activeItem={currentView}
          onItemChange={setCurrentView}
        />
        <main className="flex-1">
          <SupervisorDashboardContent currentView={currentView} />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default SupervisorDashboard;
