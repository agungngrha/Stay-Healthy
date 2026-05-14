import { useState } from "react";
import { Star } from "lucide-react";
import { useNotification } from "./Notification";

export default function GiveReviews({ doctorName = "your doctor" }) {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const { notify } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    notify("Thank you for your review!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div>
        <h3 className="text-lg font-semibold">Review {doctorName}</h3>
        <p className="text-sm text-muted-foreground">Share your experience to help other patients.</p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Your name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitted}
          className="input disabled:opacity-60"
        />
      </label>

      <div>
        <span className="mb-1.5 block text-sm font-medium">Rating</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              disabled={submitted}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className="disabled:opacity-60"
            >
              <Star
                className={`h-6 w-6 transition ${
                  n <= (hover || rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Review</span>
        <textarea
          required
          value={review}
          onChange={(e) => setReview(e.target.value)}
          disabled={submitted}
          rows={4}
          className="input disabled:opacity-60"
          placeholder="Describe your experience..."
        />
      </label>

      <button
        type="submit"
        disabled={submitted}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitted ? "Review Submitted" : "Submit Review"}
      </button>
    </form>
  );
}
