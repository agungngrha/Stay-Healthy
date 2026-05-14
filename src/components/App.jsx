import { Outlet } from "@tanstack/react-router";
import Navbar from "./Navbar";
import { NotificationProvider } from "./Notification";

// App shell — integrates the Notification component for application-wide visibility,
// so any page or component can call useNotification() to show alerts globally.
export default function App() {
  return (
    <NotificationProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-border/60 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MediBook · Your trusted appointment booking platform
        </footer>
      </div>
    </NotificationProvider>
  );
}
