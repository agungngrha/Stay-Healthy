import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Search, ShieldCheck, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "MediBook — Book Trusted Doctors Online" },
      { name: "description", content: "MediBook helps you find and book appointments with trusted doctors in seconds. Sign up free and manage your healthcare with ease." },
      { property: "og:title", content: "MediBook — Book Trusted Doctors Online" },
      { property: "og:description", content: "Find doctors, book appointments, give reviews — all in one place." },
    ],
  }),
});

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-soft)" }}>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-[var(--primary-soft)] px-3 py-1 text-xs font-medium text-primary">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified doctors
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Healthcare appointments, <span className="text-primary">simplified</span>.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Search trusted doctors, book consultations instantly, and manage your medical journey — all from one calm, modern dashboard.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/appointments" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90">
                  <Calendar className="h-4 w-4" /> Book an appointment
                </Link>
                <Link to="/signup" className="inline-flex items-center rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-accent">
                  Create free account
                </Link>
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                <Stat value="10k+" label="Patients" />
                <Stat value="500+" label="Doctors" />
                <Stat value="4.9★" label="Rating" />
              </dl>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dr. Amelia Chen</p>
                    <p className="text-xs text-muted-foreground">Cardiologist · 12 yrs</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
                  {["Mon", "Tue", "Wed"].map((d, i) => (
                    <div key={d} className={`rounded-lg border p-3 text-center ${i === 1 ? "border-primary bg-[var(--primary-soft)] text-primary font-medium" : "border-border"}`}>
                      <p>{d}</p>
                      <p className="mt-1 font-semibold text-foreground">{12 + i}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  {["09:00", "10:30", "14:00"].map((t, i) => (
                    <button key={t} className={`rounded-lg border p-2 ${i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent"}`}>
                      {t}
                    </button>
                  ))}
                </div>
                <button className="mt-5 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Confirm booking
                </button>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:block">
                <p className="text-xs text-muted-foreground">Confirmed</p>
                <p className="mt-1 text-sm font-semibold">Tue · 10:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">Everything you need, nothing you don't</h2>
          <p className="mt-3 text-muted-foreground">A focused toolkit for finding the right doctor and managing your appointments confidently.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Feature icon={Search} title="Find doctors fast" desc="Search by name or specialty and discover verified providers near you." />
          <Feature icon={Calendar} title="Instant booking" desc="Pick a slot and confirm in seconds — no phone calls, no waiting." />
          <Feature icon={ShieldCheck} title="Trusted reviews" desc="Read honest patient reviews and share your own experience." />
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-2xl font-semibold text-foreground">{value}</dt>
      <dd className="text-xs text-muted-foreground">{label}</dd>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
