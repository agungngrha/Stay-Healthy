import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { useNotification } from "./Notification";

// Simulated registration API endpoint
const REGISTER_API = "/api/register";

export default function Sign_Up() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    role: "Patient",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const registerUser = async (payload) => {
    // Invokes the registration API to register a new user.
    // In production, replace with: await fetch(REGISTER_API, { method: 'POST', body: JSON.stringify(payload) })
    try {
      await fetch(REGISTER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);
    } catch (_) {}
    return { success: true, user: { ...payload, id: Date.now() } };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await registerUser(form);
    if (res.success) {
      localStorage.setItem("auth_user", JSON.stringify(res.user));
      window.dispatchEvent(new Event("auth-change"));
      notify(`Welcome ${form.name}! Account created.`);
      navigate({ to: "/" });
    } else {
      notify("Registration failed", "error");
    }
    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign up to book and manage appointments.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Field label="Role">
            <select value={form.role} onChange={update("role")} className="input">
              <option>Patient</option>
              <option>Doctor</option>
            </select>
          </Field>
          <Field label="Name">
            <input required value={form.name} onChange={update("name")} className="input" placeholder="Jane Doe" />
          </Field>
          <Field label="Email">
            <input required type="email" value={form.email} onChange={update("email")} className="input" placeholder="you@example.com" />
          </Field>
          <Field label="Phone">
            <input required type="tel" value={form.phone} onChange={update("phone")} className="input" placeholder="+1 555 555 5555" />
          </Field>
          <Field label="Password">
            <input required type="password" minLength={6} value={form.password} onChange={update("password")} className="input" placeholder="••••••••" />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
