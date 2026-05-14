import { useState } from "react";
import { Search } from "lucide-react";

export default function FindDoctorSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-[var(--shadow-card)]">
      <div className="flex flex-1 items-center gap-2 px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch?.(e.target.value.trim());
          }}
          placeholder="Search doctor by name or specialty..."
          className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Search
      </button>
    </form>
  );
}
