
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SecretarySidebarMenu } from "@/components/secretary/SecretarySidebarMenu";
import { SecretaryDashboardContent } from "@/components/secretary/SecretaryDashboardContent";


const SecretaryDashboard = () => {
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <SidebarProvider>
        <SecretarySidebarMenu 
          activeItem={currentView}
          onItemChange={setCurrentView}
        />
        <main className="flex-1">
          <SecretaryDashboardContent currentView={currentView} />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default SecretaryDashboard;
