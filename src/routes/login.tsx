import { createFileRoute } from "@tanstack/react-router";
import Login from "../components/Login.jsx";

export const Route = createFileRoute("/login")({
  component: () => (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <Login />
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Login — MediBook" },
      { name: "description", content: "Login to your MediBook account to manage appointments and reviews." },
    ],
  }),
});
