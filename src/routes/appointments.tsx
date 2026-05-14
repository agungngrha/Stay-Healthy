import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import FindDoctorSearch from "../components/FindDoctorSearch.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
import GiveReviews from "../components/GiveReviews.jsx";

export const Route = createFileRoute("/appointments")({
  component: AppointmentsPage,
  head: () => ({
    meta: [
      { title: "Appointments — MediBook" },
      { name: "description", content: "Search verified doctors and book your next medical appointment in minutes." },
    ],
  }),
});

const DOCTORS = [
  { id: 1, name: "Dr. Amelia Chen", specialty: "Cardiologist", rating: 4.9, experience: 12 },
  { id: 2, name: "Dr. Marcus Patel", specialty: "Dermatologist", rating: 4.8, experience: 8 },
  { id: 3, name: "Dr. Sofia Rivera", specialty: "Pediatrician", rating: 5.0, experience: 15 },
  { id: 4, name: "Dr. Liam O'Connor", specialty: "Neurologist", rating: 4.7, experience: 10 },
  { id: 5, name: "Dr. Hana Tanaka", specialty: "Orthopedic", rating: 4.9, experience: 14 },
  { id: 6, name: "Dr. Noah Bennett", specialty: "General Physician", rating: 4.6, experience: 6 },
];

function AppointmentsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return DOCTORS;
    return DOCTORS.filter((d) =>
      d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Find your doctor</h1>
        <p className="mt-2 text-muted-foreground">Search by name or specialty, then book a convenient slot.</p>
      </header>

      <div className="mt-6">
        <FindDoctorSearch onSearch={setQuery} />
      </div>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => <DoctorCard key={d.id} doctor={d} />)}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No doctors match "{query}".</p>
        )}
      </section>

      <section className="mt-16 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight">Share your experience</h2>
        <p className="mt-2 mb-6 text-muted-foreground">Your reviews help other patients choose with confidence.</p>
        <GiveReviews doctorName="Dr. Amelia Chen" />
      </section>
    </div>
  );
}
