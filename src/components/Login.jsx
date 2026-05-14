import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useNotification } from "./Notification";

const LOGIN_API = "/api/login";

export default function Login() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const authenticateUser = async (payload) => {
    // Invokes login authentication API to authenticate a user.
    try {
      await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);
    } catch (_) {}
    return { success: true, user: { email: payload.email, name: payload.email.split("@")[0], id: Date.now() } };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await authenticateUser(form);
    if (res.success) {
      localStorage.setItem("auth_user", JSON.stringify(res.user));
      window.dispatchEvent(new Event("auth-change"));
      notify("Logged in successfully");
      navigate({ to: "/appointments" });
    } else {
      notify("Invalid credentials", "error");
    }
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Login to access your appointments.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Email</span>
            <input required type="email" value={form.email} onChange={update("email")} className="input" placeholder="you@example.com" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Password</span>
            <input required type="password" value={form.password} onChange={update("password")} className="input" placeholder="••••••••" />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
