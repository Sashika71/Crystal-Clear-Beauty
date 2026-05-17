import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";

const reviewEndpoint = `${import.meta.env.VITE_BACKEND_URL}/api/review`;

function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [formData, setFormData] = useState({
    name: "",
    rating: "5",
    title: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      setIsLoading(true);
      const response = await axios.get(reviewEndpoint);

      if (Array.isArray(response.data)) {
        setReviews(response.data);
        return;
      }

      if (Array.isArray(response.data?.reviews)) {
        setReviews(response.data.reviews);
        return;
      }

      setReviews([]);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
      toast.error("Could not load reviews.");
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      name: formData.name.trim(),
      rating: Number(formData.rating),
      title: formData.title.trim(),
      message: formData.message.trim(),
    };

    try {
      setIsSubmitting(true);
      await axios.post(reviewEndpoint, payload);
      await loadReviews();

      setFormData({
        name: "",
        rating: "5",
        title: "",
        message: "",
      });
      setSubmitted(true);

      window.setTimeout(() => {
        setSubmitted(false);
      }, 2500);
    } catch (error) {
      console.error("Failed to submit review", error);
      toast.error("Could not submit your review.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const visibleReviews = useMemo(
    () =>
      reviews
        .filter((review) => {
          if (filter === "all") return true;
          if (filter === "5") return review.rating === 5;
          if (filter === "4plus") return review.rating >= 4;
          return true;
        })
        .sort((first, second) => {
          if (sortBy === "highest") {
            return (
              second.rating - first.rating ||
              new Date(second.createdAt || second.date) -
                new Date(first.createdAt || first.date)
            );
          }

          return (
            new Date(second.createdAt || second.date) -
            new Date(first.createdAt || first.date)
          );
        }),
    [reviews, filter, sortBy]
  );

  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-[0_20px_70px_rgba(244,114,182,0.12)]">
        <div className="border-b border-pink-100 bg-[radial-gradient(circle_at_top_left,_rgba(251,207,232,0.95),_rgba(255,251,247,1)_60%,_rgba(255,255,255,1)_100%)] px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-800">
            Reviews
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Add your review and browse what others are saying
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Customers can submit a rating and message, then filter the reviews by score or sort them by newest and highest rated.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-800">
                Total Reviews
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{reviews.length}</p>
            </div>
            <div className="rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-800">
                Average Rating
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{averageRating}</p>
            </div>
            <div className="rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-800">
                Read Options
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Filter by rating or sort by newest and highest rated.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <section className="rounded-[28px] border border-pink-100 bg-pink-50/60 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-800">
              Add a review
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              Share your experience
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Keep it short or write a longer note. Your review will appear in the list after you submit it.
            </p>

            {submitted && (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                Thanks. Your review was added.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                  placeholder="Your name"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Rating
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleFormChange}
                  className="mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Great</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Title
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                  className="mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                  placeholder="Short headline"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Review
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={6}
                  className="mt-2 w-full resize-none rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                  placeholder="Tell us what you liked or what could improve..."
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-pink-800 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-900 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </section>

          <section className="rounded-[28px] border border-pink-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-pink-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-800">
                  Read reviews
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  Browse customer feedback
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Filter
                  <select
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    className="mt-2 w-full rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-pink-400"
                  >
                    <option value="all">All reviews</option>
                    <option value="5">Only 5 stars</option>
                    <option value="4plus">4 stars and above</option>
                  </select>
                </label>

                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Sort
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="mt-2 w-full rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-pink-400"
                  >
                    <option value="newest">Newest first</option>
                    <option value="highest">Highest rated</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {isLoading && (
                <div className="rounded-3xl border border-dashed border-pink-200 bg-pink-50 px-6 py-10 text-center text-sm text-slate-600">
                  Loading reviews...
                </div>
              )}

              {visibleReviews.map((review) => (
                <article
                  key={review._id || review.id}
                  className="rounded-3xl border border-pink-100 bg-pink-50/50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.35em] text-pink-800">
                        {formatDate(review.createdAt || review.date)}
                      </p>
                    </div>
                    <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                      {review.rating}.0 / 5
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-slate-950">
                    {review.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{review.message}</p>
                </article>
              ))}

              {!isLoading && visibleReviews.length === 0 && (
                <div className="rounded-3xl border border-dashed border-pink-200 bg-pink-50 px-6 py-10 text-center text-sm text-slate-600">
                  No reviews match the selected filter.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}
