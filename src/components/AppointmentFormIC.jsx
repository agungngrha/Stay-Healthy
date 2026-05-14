import { useState } from "react";

// Instant Consultation appointment form — only Name and Phone Number fields.
export default function AppointmentFormIC({ doctorName, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ ...form, doctorName, type: "instant" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Instant Consultation — {doctorName}</h3>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Name</span>
        <input required value={form.name} onChange={update("name")} className="input" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Phone Number</span>
        <input required type="tel" value={form.phone} onChange={update("phone")} className="input" />
      </label>
      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Confirm
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent">
          Cancel
        </button>
      </div>
    </form>
  );
}
