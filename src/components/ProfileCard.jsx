import { useEffect, useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { useNotification } from "./Notification";

export default function ProfileCard() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", role: "Patient" });
  const [draft, setDraft] = useState(profile);
  const { notify } = useNotification();

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      const next = { name: parsed.name || "", email: parsed.email || "", phone: parsed.phone || "", role: parsed.role || "Patient" };
      setProfile(next);
      setDraft(next);
    }
  }, []);

  const update = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(draft);
    localStorage.setItem("auth_user", JSON.stringify(draft));
    window.dispatchEvent(new Event("auth-change"));
    setEditing(false);
    notify("Profile updated");
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-soft)] text-primary text-xl font-semibold">
            {(profile.name || "?").slice(0, 1).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.name || "Your name"}</h2>
            <p className="text-sm text-muted-foreground">{profile.role}</p>
          </div>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent">
            <Pencil className="h-4 w-4" /> Edit
          </button>
        ) : (
          <button onClick={() => { setDraft(profile); setEditing(false); }} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm hover:bg-accent">
            <X className="h-4 w-4" /> Cancel
          </button>
        )}
      </div>

      {!editing ? (
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <Info label="Email" value={profile.email} />
          <Info label="Phone" value={profile.phone} />
          <Info label="Role" value={profile.role} />
        </dl>
      ) : (
        <form onSubmit={handleSave} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-medium">Name</span><input className="input" value={draft.name} onChange={update("name")} /></label>
          <label className="block"><span className="mb-1.5 block text-sm font-medium">Email</span><input className="input" type="email" value={draft.email} onChange={update("email")} /></label>
          <label className="block"><span className="mb-1.5 block text-sm font-medium">Phone</span><input className="input" value={draft.phone} onChange={update("phone")} /></label>
          <label className="block sm:col-span-2"><span className="mb-1.5 block text-sm font-medium">Role</span>
            <select className="input" value={draft.role} onChange={update("role")}>
              <option>Patient</option>
              <option>Doctor</option>
            </select>
          </label>
          <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Save className="h-4 w-4" /> Save changes
          </button>
        </form>
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-foreground">{value || "—"}</dd>
    </div>
  );
}
