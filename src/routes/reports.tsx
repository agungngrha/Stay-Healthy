import { createFileRoute } from "@tanstack/react-router";
import ReportsTable from "../components/ReportsTable.jsx";

export const Route = createFileRoute("/reports")({
  component: () => (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <ReportsTable />
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Patient Report — MediBook" },
      { name: "description", content: "View consultation history, prescriptions, and lab results in one place." },
    ],
  }),
});
