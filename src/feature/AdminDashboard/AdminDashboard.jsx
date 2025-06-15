
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebarMenu } from "@/components/admin/AdminSidebarMenu";
import { AdminDashboardContent } from "@/components/admin/AdminDashboardContent";


const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <SidebarProvider>
        <AdminSidebarMenu 
          activeItem={currentView}
          onItemChange={setCurrentView}
        />
        <main className="flex-1">
          <AdminDashboardContent currentView={currentView} />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;
