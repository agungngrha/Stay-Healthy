import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Stethoscope, LogOut, Menu, X } from "lucide-react";
import { useNotification } from "./Notification";

export default function Navbar() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { notify } = useNotification();

  useEffect(() => {
    setIsAuthed(!!localStorage.getItem("auth_user"));
    const handler = () => setIsAuthed(!!localStorage.getItem("auth_user"));
    window.addEventListener("storage", handler);
    window.addEventListener("auth-change", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("auth-change", handler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_user");
    window.dispatchEvent(new Event("auth-change"));
    notify("Logged out successfully");
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">MediBook</span>
        </Link>

        <button
          className="md:hidden p-2 rounded-md hover:bg-accent"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md">Home</Link>
          <Link to="/appointments" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md">Appointments</Link>
          {!isAuthed ? (
            <>
              <Link to="/login" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md">Login</Link>
              <Link to="/signup" className="ml-2 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md">Profile</Link>
              <button
                onClick={handleLogout}
                className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border/60 px-4 py-3 flex flex-col gap-1">
          <Link to="/" onClick={() => setOpen(false)} className="px-3 py-2 text-sm">Home</Link>
          <Link to="/appointments" onClick={() => setOpen(false)} className="px-3 py-2 text-sm">Appointments</Link>
          {!isAuthed ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 text-sm">Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-medium text-primary">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="px-3 py-2 text-sm text-left flex items-center gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
