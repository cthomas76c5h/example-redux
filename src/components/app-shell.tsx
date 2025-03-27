import { SidebarProvider } from "./ui/sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface AppShellProps {
  children: React.ReactNode;
  variant?: "header" | "sidebar";
}

export function AppShell({ children, variant = "header" }: AppShellProps) {
  // Set the initial sidebar open state, reading from localStorage.
  const [isOpen, setIsOpen] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("sidebar") !== "false" : true
  );

  // Retrieve authentication data from Redux store.
  // Notice the correct path in state: state.sharedData.auth
  const auth = useSelector((state: RootState) => state.sharedData.auth);

  // Clear local storage if the user is not authenticated.
  useEffect(() => {
    if (!auth.user) {
      localStorage.clear();
    }
  }, [auth.user]);

  const handleSidebarChange = (open: boolean) => {
    setIsOpen(open);

    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar", String(open));
    }
  };

  if (variant === "header") {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>;
  }

  return (
    <SidebarProvider defaultOpen={isOpen} open={isOpen} onOpenChange={handleSidebarChange}>
      {children}
    </SidebarProvider>
  );
}
