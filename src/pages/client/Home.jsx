import { Link } from "react-router-dom";
import heroImage from "../../assets/images/heroimage.jpeg";

const collectionPoints = [
  {
    title: "Glow-first formulas",
    text: "Soft textures, luminous finishes, and daily essentials that feel premium.",
  },
  {
    title: "Skin-friendly ritual",
    text: "A calm routine designed to look polished and feel easy every morning.",
  },
  {
    title: "Fast checkout flow",
    text: "Move from discovery to cart quickly, with a clean and simple shopping path.",
  },
];

const reviews = [
  {
    name: "Nimasha",
    text: "The layout feels premium and the products are easy to browse on mobile.",
  },
  {
    name: "Ishan",
    text: "The hero section gives the store a luxury look without feeling crowded.",
  },
  {
    name: "Ayesha",
    text: "The cart and login buttons are clear and the whole page feels polished.",
  },
];

export default function Home() {
  const imageSrc = heroImage;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section className="overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-[0_30px_90px_rgba(244,114,182,0.16)]">
        <div className="grid min-h-[560px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center gap-6 bg-[radial-gradient(circle_at_top_left,_rgba(251,207,232,0.92),_rgba(255,251,247,1)_58%,_rgba(255,255,255,1)_100%)] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <span className="text-xs font-semibold uppercase tracking-[0.45em] text-pink-500">
              New Collection
            </span>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                The Petal Dew Ritual
              </h1>
              <p className="max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                Experience the softness of dewy skin, glowing tones, and a fragrance-light routine built for modern beauty.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-600"
              >
                Shop Collection
              </Link>
              <a
                href="#reviews"
                className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-pink-300 hover:text-pink-500"
              >
                View Reviews
              </a>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {collectionPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-2xl border border-pink-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
                >
                  <h2 className="text-sm font-semibold text-slate-900">{point.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{point.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-[#f7ebe7] lg:min-h-full">
            <img
              src={imageSrc}
              alt="Beauty campaign hero"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-white/5 via-transparent to-black/12" />

            <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xs rounded-2xl border border-white/50 bg-white/82 px-4 py-3 text-slate-800 shadow-xl backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-500">
                  Signature Look
                </p>
                <p className="mt-2 text-sm leading-6">
                  Soft glow, clean skin tones, and a luxury storefront feel.
                </p>
              </div>
              <div className="w-fit rounded-full border border-white/60 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 shadow-lg backdrop-blur-md">
                Beauty store home
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="grid gap-4 lg:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review.name}
            className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
              Review
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">{review.text}</p>
            <p className="mt-5 text-sm font-semibold text-slate-900">{review.name}</p>
          </article>
        ))}
      </section>

      <section
        id="contact"
        className="grid gap-6 rounded-[28px] border border-pink-100 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-500">
            Contact us
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Let’s build your storefront around the image you want.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            You can keep the default hero image or swap it with your own beauty banner later. The home layout is ready for product browsing, contact info, reviews, cart access, and login.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-pink-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Email</p>
            <p className="mt-2 text-sm text-slate-600">hello@crystalclearbeauty.com</p>
          </div>
          <div className="rounded-2xl bg-pink-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Phone</p>
            <p className="mt-2 text-sm text-slate-600">+94 77 123 4567</p>
          </div>
          <div className="rounded-2xl bg-pink-50 p-5 sm:col-span-2">
            <p className="text-sm font-semibold text-slate-900">Quick links</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <Link to="/products" className="rounded-full bg-white px-4 py-2 font-semibold text-pink-500 shadow-sm">
                Products
              </Link>
              <Link to="/cart" className="rounded-full bg-white px-4 py-2 font-semibold text-pink-500 shadow-sm">
                Cart
              </Link>
              <Link to="/login" className="rounded-full bg-white px-4 py-2 font-semibold text-pink-500 shadow-sm">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
