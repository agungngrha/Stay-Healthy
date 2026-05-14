import { useEffect, useMemo, useState } from "react";
import { FileText, Download, Search, Filter, Stethoscope, Pill, FlaskConical } from "lucide-react";
import { useNotification } from "./Notification";

const SEED_REPORTS = [
  {
    id: "RPT-1042",
    date: "2026-05-02",
    doctor: "Dr. Anita Wijaya",
    specialty: "Cardiology",
    diagnosis: "Mild Hypertension",
    prescription: "Amlodipine 5mg — once daily",
    notes: "Lifestyle adjustment recommended. Follow-up in 4 weeks.",
    status: "Completed",
    type: "Consultation",
  },
  {
    id: "RPT-1031",
    date: "2026-04-18",
    doctor: "Dr. Budi Santoso",
    specialty: "General Physician",
    diagnosis: "Seasonal Flu",
    prescription: "Paracetamol 500mg, Vitamin C",
    notes: "Rest for 3 days, increase fluid intake.",
    status: "Completed",
    type: "Consultation",
  },
  {
    id: "RPT-1019",
    date: "2026-03-27",
    doctor: "Dr. Citra Lestari",
    specialty: "Dermatology",
    diagnosis: "Mild eczema on forearm",
    prescription: "Hydrocortisone 1% cream",
    notes: "Apply twice daily for 7 days.",
    status: "Completed",
    type: "Consultation",
  },
  {
    id: "LAB-0087",
    date: "2026-05-04",
    doctor: "Dr. Anita Wijaya",
    specialty: "Cardiology",
    diagnosis: "Lipid panel — borderline LDL",
    prescription: "—",
    notes: "Total cholesterol 215 mg/dL · LDL 142 · HDL 48 · TG 160.",
    status: "Reviewed",
    type: "Lab Result",
  },
  {
    id: "RX-2210",
    date: "2026-05-02",
    doctor: "Dr. Anita Wijaya",
    specialty: "Cardiology",
    diagnosis: "Refill — Amlodipine",
    prescription: "Amlodipine 5mg × 30 tablets",
    notes: "Pickup at affiliated pharmacy.",
    status: "Active",
    type: "Prescription",
  },
];

const TYPES = ["All", "Consultation", "Lab Result", "Prescription"];

const TypeIcon = ({ type, className = "h-4 w-4" }) => {
  if (type === "Lab Result") return <FlaskConical className={className} />;
  if (type === "Prescription") return <Pill className={className} />;
  return <Stethoscope className={className} />;
};

export default function ReportsTable() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [active, setActive] = useState(null);
  const { notify } = useNotification();
  const [authedName, setAuthedName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      try { setAuthedName(JSON.parse(stored).name || ""); } catch { /* noop */ }
    }
  }, []);

  const filtered = useMemo(() => {
    return SEED_REPORTS.filter((r) => {
      const matchesType = type === "All" || r.type === type;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q ||
        r.doctor.toLowerCase().includes(q) ||
        r.diagnosis.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [query, type]);

  const handleDownload = (r) => {
    const lines = [
      `MediBook — Patient Report`,
      `============================`,
      `Report ID : ${r.id}`,
      `Date      : ${r.date}`,
      `Patient   : ${authedName || "—"}`,
      `Doctor    : ${r.doctor} (${r.specialty})`,
      `Type      : ${r.type}`,
      `Status    : ${r.status}`,
      ``,
      `Diagnosis`,
      `---------`,
      r.diagnosis,
      ``,
      `Prescription`,
      `------------`,
      r.prescription,
      ``,
      `Notes`,
      `-----`,
      r.notes,
    ].join("\n");

    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${r.id}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    notify(`Downloaded ${r.id}`);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Patient Report</h1>
          <p className="text-sm text-muted-foreground">
            History of consultations, prescriptions and lab results{authedName ? ` for ${authedName}` : ""}.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileText className="h-4 w-4" />
          {filtered.length} record{filtered.length === 1 ? "" : "s"}
        </div>
      </header>

      <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="input pl-9"
            placeholder="Search by doctor, diagnosis, or report ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-1">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  type === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-accent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="hidden grid-cols-[110px_110px_1fr_1fr_110px_140px] gap-4 border-b border-border bg-muted/40 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
          <span>Report</span>
          <span>Date</span>
          <span>Doctor</span>
          <span>Diagnosis</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">
            No reports match your filters.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((r) => (
              <li key={r.id} className="px-4 py-4">
                <div className="grid gap-3 md:grid-cols-[110px_110px_1fr_1fr_110px_140px] md:items-center md:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--primary-soft)] text-primary">
                      <TypeIcon type={r.type} />
                    </span>
                    <span className="text-sm font-medium">{r.id}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{r.date}</div>
                  <div>
                    <p className="text-sm font-medium">{r.doctor}</p>
                    <p className="text-xs text-muted-foreground">{r.specialty}</p>
                  </div>
                  <div className="text-sm text-foreground">{r.diagnosis}</div>
                  <div>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      r.status === "Active"
                        ? "bg-amber-100 text-amber-700"
                        : r.status === "Reviewed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}>{r.status}</span>
                  </div>
                  <div className="flex justify-start gap-2 md:justify-end">
                    <button
                      onClick={() => setActive(active === r.id ? null : r.id)}
                      className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium hover:bg-accent"
                    >
                      {active === r.id ? "Hide" : "View"}
                    </button>
                    <button
                      onClick={() => handleDownload(r)}
                      className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      <Download className="h-3.5 w-3.5" /> Save
                    </button>
                  </div>
                </div>

                {active === r.id && (
                  <div className="mt-4 grid gap-4 rounded-xl border border-border bg-muted/30 p-4 sm:grid-cols-2">
                    <Detail label="Prescription" value={r.prescription} />
                    <Detail label="Type" value={r.type} />
                    <div className="sm:col-span-2">
                      <Detail label="Clinical notes" value={r.notes} />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm text-foreground">{value || "—"}</p>
    </div>
  );
}
