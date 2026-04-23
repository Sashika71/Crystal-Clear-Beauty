import { useState } from "react";

export default function ContactUs() {
  const mapSrc =
    "https://www.google.com/maps?q=25%20Galle%20Road,%20Colombo%2003&z=15&output=embed";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-[0_20px_70px_rgba(244,114,182,0.12)]">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="bg-[radial-gradient(circle_at_top_left,_rgba(251,207,232,0.95),_rgba(255,251,247,1)_60%,_rgba(255,255,255,1)_100%)] px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-500">
              Contact Us
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
              Let us help you create your perfect beauty routine.
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
              Send us your question, feedback, or custom product request and our team
              will get back to you shortly.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <p className="text-sm font-semibold text-slate-900">Email</p>
                <p className="mt-1 text-sm text-slate-600">hello@crystalclearbeauty.com</p>
              </div>
              <div className="rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <p className="text-sm font-semibold text-slate-900">Phone</p>
                <p className="mt-1 text-sm text-slate-600">+94 77 456 7890</p>
              </div>
              <div className="rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <p className="text-sm font-semibold text-slate-900">Address</p>
                <p className="mt-1 text-sm text-slate-600">25 Galle Road, Colombo 03</p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm">
              <div className="border-b border-pink-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">Find us on the map</p>
                <p className="mt-1 text-xs text-slate-500">Tap to open the full location in Google Maps.</p>
              </div>
              <iframe
                title="Crystal Clear Beauty location map"
                src={mapSrc}
                className="h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>

          <div className="px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
            {submitted && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                Thanks for reaching out. We received your message.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    placeholder="Your name"
                  />
                </label>

                <label className="text-sm font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="mt-2 w-full resize-none rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                  placeholder="Tell us what you need..."
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
