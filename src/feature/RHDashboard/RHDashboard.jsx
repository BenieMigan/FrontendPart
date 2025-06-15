
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HRSidebarMenu } from "@/components/hr/HRSidebarMenu";
import { HRDashboardContent } from "@/components/hr/HRDashboardContent";

const RHDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <SidebarProvider>
        <HRSidebarMenu 
          activeItem={currentView}
          onItemChange={setCurrentView}
        />
        <main className="flex-1">
          <HRDashboardContent currentView={currentView} />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default RHDashboard;
