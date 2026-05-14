import { useState } from "react";

export default function AppointmentForm({ doctorName, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "" });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ ...form, doctorName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Book appointment with {doctorName}</h3>
      <Field label="Name">
        <input required value={form.name} onChange={update("name")} className="input" />
      </Field>
      <Field label="Phone Number">
        <input required type="tel" value={form.phone} onChange={update("phone")} className="input" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date">
          <input required type="date" value={form.date} onChange={update("date")} className="input" />
        </Field>
        <Field label="Time">
          <input required type="time" value={form.time} onChange={update("time")} className="input" />
        </Field>
      </div>
      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Book Appointment
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent">
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
