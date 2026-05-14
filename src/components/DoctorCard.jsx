import { useState } from "react";
import { Star, Calendar } from "lucide-react";
import AppointmentForm from "./AppointmentForm";
import AppointmentFormIC from "./AppointmentFormIC";
import { useNotification } from "./Notification";

export default function DoctorCard({ doctor }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("standard"); // "standard" | "instant"
  const [appointment, setAppointment] = useState(null);
  const { notify } = useNotification();

  const handleBook = (data) => {
    setAppointment(data);
    setOpen(false);
    notify(`Appointment booked with ${doctor.name}`);
  };

  // Cancel appointment logic
  const handleCancel = () => {
    setAppointment(null);
    notify(`Appointment with ${doctor.name} cancelled`);
  };

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)]">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)] text-primary text-lg font-semibold">
          {doctor.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
            <span>{doctor.rating} · {doctor.experience} yrs exp</span>
          </div>
        </div>
      </div>

      {appointment ? (
        <div className="mt-4 rounded-lg border border-primary/30 bg-[var(--primary-soft)] p-3 text-sm">
          <p className="font-medium text-foreground">Booked for {appointment.name}</p>
          {appointment.date && <p className="text-muted-foreground">{appointment.date} at {appointment.time}</p>}
          <button
            onClick={handleCancel}
            className="mt-2 text-xs font-medium text-destructive hover:underline"
          >
            Cancel appointment
          </button>
        </div>
      ) : !open ? (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => { setMode("standard"); setOpen(true); }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4" /> Book
          </button>
          <button
            onClick={() => { setMode("instant"); setOpen(true); }}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            Instant
          </button>
        </div>
      ) : (
        <div className="mt-4">
          {mode === "standard" ? (
            <AppointmentForm doctorName={doctor.name} onSubmit={handleBook} onCancel={() => setOpen(false)} />
          ) : (
            <AppointmentFormIC doctorName={doctor.name} onSubmit={handleBook} onCancel={() => setOpen(false)} />
          )}
        </div>
      )}
    </article>
  );
}
