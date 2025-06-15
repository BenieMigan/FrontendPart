
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DepartmentHeadSidebarMenu } from "@/components/department-head/DepartmentHeadSidebarMenu";
import { DepartmentHeadDashboardContent } from "@/components/department-head/DepartmentHeadDashboardContent";


const DepartmentHeadDashboard = () => {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <SidebarProvider>
        <DepartmentHeadSidebarMenu 
          activeItem={currentView}
          onItemChange={setCurrentView}
        />
        <main className="flex-1">
          <DepartmentHeadDashboardContent currentView={currentView} />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DepartmentHeadDashboard;
