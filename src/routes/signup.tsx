import { createFileRoute } from "@tanstack/react-router";
import Sign_Up from "../components/Sign_Up.jsx";

export const Route = createFileRoute("/signup")({
  component: () => (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <Sign_Up />
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Sign Up — MediBook" },
      { name: "description", content: "Create your free MediBook account to book and manage doctor appointments." },
    ],
  }),
});
