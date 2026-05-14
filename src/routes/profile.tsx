import { createFileRoute } from "@tanstack/react-router";
import ProfileCard from "../components/ProfileCard.jsx";

export const Route = createFileRoute("/profile")({
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <ProfileCard />
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Profile — MediBook" },
      { name: "description", content: "View and edit your MediBook profile information." },
    ],
  }),
});
